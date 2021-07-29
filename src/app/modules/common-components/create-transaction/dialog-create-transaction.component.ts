import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {PaymentService} from 'src/app/services/payment/payment.service';
import {Router} from '@angular/router';
import {Utilities} from '../../../utils/Utilities';
import {ConstantsApp} from '../../../utils/ConstantsApp';
import {Global} from '../../../models/Global';
import {NotifyService} from '../../../services/notify/notify.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ImportCost} from "../../../models/ImportCost";
import {Package} from "../../../models/Package";
import {ManageSessionStorage} from "../../../utils/ManageSessionStorage";
import { CouponsService } from 'src/app/services/cuopons/coupons.service';
import { Coupon } from 'src/app/models/Coupon';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './dialog-create-transaction.component.html',
  styleUrls: ['./dialog-create-transaction.component.scss']
})
export class DialogCreateTransactionComponent implements OnInit {
  /**
   * Método de pago seleccionado
   */
  public payment_method_selected: string;
  public payment_methods: any = [];
  private URL_REDIRECT: string = Global.URL.endPointWeb + 'import/plans';
  // private URL_REDIRECT: string =  'https://jobkii.com/app/my-transactions';

  is_valid = true;
  card: FormGroup;
  coupon: FormGroup;
  nequi: FormGroup;
  pse: FormGroup;
  bancolombia: FormGroup;
  submitted = false;
  titulo = 'Datos de la tarjeta y el pago';
  pre_token = '';
  value_total = 0;
  commission = 0;
  pse_institutions = [];
  public constants = ConstantsApp;

  public coupon_user:Coupon;
  public preload: boolean;
  public preload_pay: boolean;
  public preload_coupon:boolean;
  public show_coupon:boolean = false;
  public terms: FormControl;
  public link = 'https://wompi.co/wp-content/uploads/2019/09/TERMINOS-Y-CONDICIONES-DE-USO-USUARIOS-WOMPI.pdf';
  public hideCVC = true;

  constructor(
    private router: Router,
    private notifyService: NotifyService,
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<DialogCreateTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Package,
    private couponsService: CouponsService
  ) {
    this.terms = new FormControl(false, Validators.required);
    this.preload_pay = false;
    this.card = this.formBuilder.group({
      number: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      exp_month: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      exp_year: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.min(21), Validators.max(50)]],
      card_holder: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      customer_email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(150), Validators.pattern(ConstantsApp.patternEmail)]],
      installments: [1, [Validators.required, Validators.min(1), Validators.max(36)]],
    });
    this.nequi = this.formBuilder.group({
      number: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      customer_email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(150), Validators.pattern(ConstantsApp.patternEmail)]],
    });
    this.bancolombia = this.formBuilder.group({
      user_type: ['', Validators.required],
      customer_email: ['', [Validators.required, Validators.email, Validators.pattern(ConstantsApp.patternEmail)]],
      payment_description: ['RECARGA JOBKII - BANCOLOMBIA', [Validators.required]]
    });
    this.pse = this.formBuilder.group({
      user_type: ['', Validators.required],
      user_doc: ['', Validators.required],
      user_id: ['', Validators.required],
      institution: ['', Validators.required],
      customer_email: ['', [Validators.required, Validators.email, Validators.pattern(ConstantsApp.patternEmail)]],
      payment_description: ['RECARGA JOBKII - PSE', [Validators.required]]
    });

    this.coupon = this.formBuilder.group({
      coupon_code: ['', Validators.required]
    });

    this.getPaymenthMethodsAndPretoken();

    // console.log(Utilities.encrypt('comer'));
    //
    // const asd = {data: 'FVIlIYDiYO4Y0uBYwoFPKG5aOiGqv9fYl9S/duuHJxG7XBwzFfoESgT+6XEnFQcteXdPtp704jrlORcE4/6Zc3z/vjyou5vj+jSY4UYGKAQcCoXtSPM5ClpsQ/ASNaV00Bzl64ShK7iUKCXctsqi0X/JNleLfoQkByDlaScL+1Jlr0ckb5Ke0vymkBqmbED3Gz6kChNzdy+W3NgKoEY0U2LzIgea6gyz0WNejju4q2iBqA51PL1qQC8GqgZ+MVRXIHIhbQKOInPxmhsck0b9Aw0NmrD1ROQoyHhTrqjNToMPY9Z63Bus/F6o3cphw4WsEkmAMjMk5QatpReGE8DptMYskzYg3Bos8Rx0eQABjHYRpGRQrnIzu/dz/rPsNeDVM6DkAeMC4Sm8hMyBay7uOG5ENb1C87zUzqJuZiHeD/aQRj48ZjwzlV779wT4h3UVo07bwTA6yM5K9PwSSUf1DUC0AbUChzVWoTyyVH70aiMSM5DiIkWlGoLtAtL3Rbh1CP5JhLzN7C0TWSHmPMpwakcVLowKUQIpSGb/gTFRi5aWz5LDGEL/mo9RuGiWTvI2jAeDnzNDuhdvrD548tWMXFf4o9d3LXcNRtB+/nLHhZj5YjNLzFqew52dJP4zAnxIayfoib5FaMQp9ej36L10o+YvsegjRPkfBSmF9Msgl8r9LWEOEanbOBoyV4kNsgyvoQsC4tCf1IcQ9oo3xOKOtJEjxkNxPgPapJt2CWShxYO+qyYLIPrjGGroU8PRUIHOkLxSbWTVftLXlZFyeymqpiyHFAzN/OLx45/u+58P1Bp7tWWrkptJ7pSDYYsi5cJ0pxpyINJjT3mwtceSHhoJRer66HDV+P3y4D2hE1vm9TM='};
    // const data1 = Utilities.decrypt(asd);
    // console.log(data1);
  }

  ngOnInit(): void {
    // this.getPaymenthMethodsAndPretoken();
    this.paymentService.getInstitutions().subscribe(resp => {
      // const bodyInstruction = resp.body;
      const bodyInstruction = Utilities.decrypt(resp.body);
      this.pse_institutions = bodyInstruction.data;
      this.preload = false;
    });
  }

  /**
   * Cragr metodos de pago y pretoken
   */
  async getPaymenthMethodsAndPretoken(): Promise<any> {
    try {
      const res: any = await this.paymentService.getPretoken().toPromise();
      // console.log(res);
      const body = Utilities.decrypt(res.body);
      // const body = res.body;
      // console.log(Utilities.encrypt(body));
      this.link = body.data.presigned_acceptance.permalink;
      this.payment_methods = body.data.accepted_payment_methods;
      this.pre_token = body.data.presigned_acceptance.acceptance_token;
    } catch (e) {
      this.notifyService.showError('Error', 'No pudimos cargar los datos de pago, por favor comunicatie con el administrador del sitio.');
    }
  }

  /**
   * Selecciona metodo de pago
   */
  selectMethod(item): void {
    this.payment_method_selected = item;
    this.calculateCommissionAndTotalValue();
  }

  calculateCommissionAndTotalValue(): void {
    let commission = 0;
    let value = this.data.cost;
    if(this.coupon_user){
      let discount = (100 - this.coupon_user.discount_percent)/100;
      value = (this.data.cost*discount); 
    }
    
    if (this.payment_method_selected == 'CARD') {
      commission = Utilities.getCommissionCardPseNequi(value);
    } else if (this.payment_method_selected == 'NEQUI') {
      commission = Utilities.getCommissionCardPseNequi(value);
    } else if (this.payment_method_selected == 'BANCOLOMBIA_TRANSFER') {
      commission = Utilities.getCommissionBanColombia(value);
    } else if (this.payment_method_selected == 'PSE') {
      commission = Utilities.getCommissionCardPseNequi(value);
    }
    this.commission = commission;
    this.value_total = value + this.commission;
    this.value_total = this.value_total>1500 ? this.value_total: 1500;
  }

  async onSubmit(): Promise<any> {
    this.submitted = true;
    if (this.card.invalid) {
      this.card.markAllAsTouched();
      this.terms.markAsTouched();
      return;
    }
    if (this.terms.value == false) {
      this.terms.markAsTouched();
      return;
    }
    this.preload_pay = true;
    await this.getPaymenthMethodsAndPretoken();
    const infocard = {
      number: '' + this.card.value.number,
      cvc: '' + this.card.value.cvc,
      exp_month: this.card.value.exp_month.length === 1 ? '0' + this.card.value.exp_month : '' + this.card.value.exp_month,
      exp_year: '' + this.card.value.exp_year,
      card_holder: '' + this.card.value.card_holder
    };
    this.paymentService.tokenCard(infocard).subscribe(response => {
      // const token_card = response.body.body.data.id;
      response = Utilities.decrypt(response.body);
      const token_card = response.data.id;
      const data = {
        value: this.value_total,
        acceptance_token: this.pre_token,
        token: token_card,
        installments: +this.card.value.installments,
        payment_method: this.payment_method_selected,
        customer_email: this.card.value.customer_email,
        currency: 'COP',
        redirect_url: this.URL_REDIRECT,
        plan_id: this.data.id,
        coupon_code:this.coupon_user==null?null: this.coupon_user.code,
        commission:this.commission
      };
      this.paymentService.transactionCard(data).subscribe(res => {
        // this.notifyService.add({
        //     severity: 'error',
        //     summary: 'Operación exitosa!',
        //     detail: 'Tu recarga ha sido exitosa.'
        // });
        // this.router.navigate(['/my-transactions/']);
        res = Utilities.decrypt(res.body);
        const transactionBank = res?.data;
        const status = transactionBank.status;
        this.showTransactionMessage(status, transactionBank);
      }, err => {
        this.notifyService.showSuccess('Aviso', 'No pudimos realizar tu pago, intenta nuevamente.');
        this.preload_pay = false;
      });
    }, err => {
      this.notifyService.showError('Aviso', 'No pudimos realizar tu pago, por favor veririca los datos e intenta nuevamente.');
      this.preload_pay = false;
    });
  }

  async paymentNequi(): Promise<any> {
    this.submitted = true;
    if (this.nequi.invalid) {
      this.nequi.markAllAsTouched();
      this.terms.markAsTouched();
      return;
    }
    if (this.terms.value == false) {
      this.terms.markAsTouched();
      return;
    }
    this.preload_pay = true;
    await this.getPaymenthMethodsAndPretoken();
    const transaction = {
      value: this.value_total,
      acceptance_token: this.pre_token,
      payment_method: this.payment_method_selected,
      customer_email: this.nequi.value.customer_email,
      currency: 'COP',
      phone_number: this.nequi.value.number, redirect_url: this.URL_REDIRECT,
      plan_id: this.data.id,
      coupon_code:this.coupon_user==null?null: this.coupon_user.code,
      commission:this.commission
    };
    this.paymentService.transactionNequi(transaction).subscribe(res => {
      // this.preload_pay = false;
      // this.notifyService.add({
      //     severity: 'error',
      //     summary: 'Operación exitosa!',
      //     detail: 'Tu recarga ha sido exitosa.'
      // });
      // this.router.navigate(['/my-transactions/']);
      res = Utilities.decrypt(res.body);
      const transactionBank = res.data;
      // const transactionBank = Utilities.decrypt(res.body?.body?.transaction_bank);
      const status = transactionBank.status;
      this.showTransactionMessage(status, transactionBank);
    }, err => {
      this.preload_pay = false;
      this.notifyService.showError('Error', 'No pudimos realizar tu pago, intenta nuevamente.');
    });
  }

  async paymentBancolombia(): Promise<any> {
    this.submitted = true;
    if (this.bancolombia.invalid) {
      this.bancolombia.markAllAsTouched();
      this.terms.markAsTouched();
      return;
    }
    if (this.terms.value == false) {
      this.terms.markAsTouched();
      return;
    }
    this.preload_pay = true;
    await this.getPaymenthMethodsAndPretoken();
    const transaction = {
      value: this.value_total,
      acceptance_token: this.pre_token,
      payment_method: this.payment_method_selected,
      customer_email: this.bancolombia.value.customer_email,
      currency: 'COP',
      user_type: this.bancolombia.value.user_type,
      payment_description: 'RECARGA JOBKII - BANCOLOMBIA',
      redirect_url: this.URL_REDIRECT,
      plan_id: this.data.id,
      coupon_code:this.coupon_user==null?null: this.coupon_user.code,
      commission:this.commission
    };
    this.paymentService.transactionBancolombia(transaction).subscribe(res => {
      // this.notifyService.add({
      //     severity: 'info',
      //     summary: 'Aviso',
      //     detail: 'En seguida serás redigirido a la página del banco.'
      // });
      // setTimeout(() => {
      //     this.router.navigate(['my-transactions']);
      //     window.open(res.body.body.transaction_bank.data.payment_method.extra.async_payment_url, "_self ");
      // }, 3000);
      res = Utilities.decrypt(res.body);
      const transactionBank = res?.data;
      const status = transactionBank.status;
      this.showTransactionMessage(status, transactionBank, true);
    }, err => {
      this.preload_pay = false;
      this.notifyService.showError('Error', 'No pudimos realizar tu pago, intenta nuevamente.');
    });
  }

  async paymentPse(): Promise<any> {
    this.submitted = true;
    if (this.pse.invalid) {
      this.pse.markAllAsTouched();
      this.terms.markAsTouched();
      return;
    }
    if (this.terms.value == false) {
      this.terms.markAsTouched();
      return;
    }
    this.preload_pay = true;
    await this.getPaymenthMethodsAndPretoken();
    const transaction = {
      value: this.value_total,
      acceptance_token: this.pre_token,
      payment_method: this.payment_method_selected,
      customer_email: this.pse.value.customer_email,
      currency: 'COP',
      user_type: +this.pse.value.user_type,
      user_doc: this.pse.value.user_doc,
      user_id: this.pse.value.user_id,
      institution: this.pse.value.institution,
      payment_description: 'RECARGA JOBKII - PSE',
      redirect_url: this.URL_REDIRECT,
      plan_id: this.data.id,
      coupon_code:this.coupon_user==null?null: this.coupon_user.code,
      commission:this.commission
    };
    this.paymentService.transactionPse(transaction).subscribe(res => {
      res = Utilities.decrypt(res.body);
      const transactionBank = res?.data;
      const status = transactionBank.status;
      this.showTransactionMessage(status, transactionBank, true);
    }, err => {
      this.preload_pay = false;
      this.notifyService.showError('Error', 'No pudimos realizar tu pago, intenta nuevamente.');
    });

  }

  showTransactionMessage(status, transactionBank, redirectToInvoice?: boolean): void {
    switch (status) {
      case 'APPROVED':
        const liquidationId = ManageSessionStorage.getAndRemoveLastSavedLiquidationId();
        if (redirectToInvoice) {
          this.notifyService.showSuccess('Aviso', 'En seguida serás redigirido a la página de tu banco.');
          setTimeout(() => {
            window.open(transactionBank?.payment_method?.extra.async_payment_url, '_blank');
            if (liquidationId) {
              this.router.navigate([`lobby/liquidations-detail/${liquidationId}`]);
            } else {
              this.router.navigate(['lobby']);
            }
            this.preload_pay = false;
            this.matDialogRef.close();
          }, 1500);
        } else {
          this.notifyService.showSuccess('Aviso', 'Transaccion realizada exitosamente.');
          setTimeout(() => {
            if (liquidationId) {
              this.router.navigate([`lobby/liquidations-detail/${liquidationId}`]);
            } else {
              this.router.navigate(['lobby']);
            }
            this.matDialogRef.close();
            this.preload_pay = false;
          }, 1000);
        }
        break;
      case 'DECLINED':
        this.notifyService.showError('Aviso', 'Tu transacción a sido rechazada, por favor intenta nuevamente.');
        this.preload_pay = false;
        break;
      case 'VOIDED':
        this.notifyService.showError('Aviso', 'Tu transacción a sido anulada, por favor intenta nuevamente.');
        this.preload_pay = false;
        break;
      case 'ERROR':
        this.notifyService.showError('Aviso', 'Ha surido un error con tu transacción, por favor intenta nuevamente.');
        this.preload_pay = false;
        break;
      default:
        this.notifyService.showError('Aviso', 'Ha surgido un error con tu transacción, por favor intenta nuevamente.');
        this.preload_pay = false;
        break;
    }
  }

  openTerms(): void {
    window.open(this.link, '_blank');
  }

  /**
   * Mensaje de error del nombre
   */
  getErrorMessageName(): string {
    if (this.card.get('card_holder').hasError('required')) {
      return 'Campo obligatorio';
    } else if (this.card.get('card_holder').hasError('minlength')) {
      return 'Mínimo 5 dígitos';
    } else if (this.card.get('card_holder').hasError('maxlength')) {
      return 'Máximo 150 dígitos';
    }
  }

  /**
   * Mensaje de error del nombre
   */
  getErrorMessageEmailCard(): string {
    if (this.card.get('customer_email').hasError('required')) {
      return 'Campo obligatorio';
    } else if (this.card.get('customer_email').hasError('minlength')) {
      return 'Mínimo 3 dígitos';
    } else if (this.card.get('customer_email').hasError('maxlength')) {
      return 'Máximo 150 dígitos';
    } else if (this.card.get('customer_email').hasError('email')) {
      return 'Correo no valido';
    } else if (this.card.get('customer_email').hasError('pattern')) {
      return 'Correo no valido';
    }
  }

  /**
   * Mensaje de error del nombre
   */
  getErrorMessageEmailNequi(): string {
    if (this.nequi.get('customer_email').hasError('required')) {
      return 'Campo obligatorio';
    } else if (this.nequi.get('customer_email').hasError('minlength')) {
      return 'Mínimo 3 dígitos';
    } else if (this.nequi.get('customer_email').hasError('maxlength')) {
      return 'Máximo 150 dígitos';
    } else if (this.nequi.get('customer_email').hasError('email')) {
      return 'Correo no valido';
    } else if (this.nequi.get('customer_email').hasError('pattern')) {
      return 'Correo no valido';
    }
  }

  /**
   * Mensaje de error del nombre
   */
  getErrorMessageEmailPSE(): string {
    if (this.pse.get('customer_email').hasError('required')) {
      return 'Campo obligatorio';
    } else if (this.pse.get('customer_email').hasError('minlength')) {
      return 'Mínimo 3 dígitos';
    } else if (this.pse.get('customer_email').hasError('maxlength')) {
      return 'Máximo 150 dígitos';
    } else if (this.pse.get('customer_email').hasError('email')) {
      return 'Correo no valido';
    } else if (this.pse.get('customer_email').hasError('pattern')) {
      return 'Correo no valido';
    }
  }

  /**
   * Mensaje de error del nombre
   */
  getErrorMessageEmailBancolombia(): string {
    if (this.bancolombia.get('customer_email').hasError('required')) {
      return 'Campo obligatorio';
    } else if (this.bancolombia.get('customer_email').hasError('minlength')) {
      return 'Mínimo 3 dígitos';
    } else if (this.bancolombia.get('customer_email').hasError('maxlength')) {
      return 'Máximo 150 dígitos';
    } else if (this.bancolombia.get('customer_email').hasError('email')) {
      return 'Correo no valido';
    } else if (this.bancolombia.get('customer_email').hasError('pattern')) {
      return 'Correo no valido';
    }
  }

  /**
   * Mensaje de error del campo mes en tarjeta crédito
   */
  getErrorCardMonth(): string {
    if (this.card.get('exp_month').hasError('required')) {
      return 'Campo obligatorio';
    } else if (this.card.get('exp_month').hasError('min')) {
      return 'Mínimo 1';
    } else if (this.card.get('exp_month').hasError('max')) {
      return 'Máximo 12';
    }
  }

  /**
   * Mensaje de error del campo año en tarjeta crédito
   */
  getErrorCardYear(): string {
    if (this.card.get('exp_year').hasError('required')) {
      return 'Campo obligatorio';
    } else if (this.card.get('exp_year').hasError('min')) {
      return 'Mínimo 21';
    } else if (this.card.get('exp_year').hasError('max')) {
      return 'Máximo 50';
    }
  }

  /**
   * Mensaje de error del nombre
   */
  getErrorMessageCuotas(): string {
    if (this.card.get('installments').hasError('required')) {
      return 'Campo obligatorio';
    } else if (this.card.get('installments').hasError('min')) {
      return 'Mínimo 1 cuota';
    } else if (this.card.get('installments').hasError('max')) {
      return 'Máximo 36 cuotas';
    }
  }

  /**
   * Mensaje de error del nombre
   */
  getErrorMessageValue(): string {
    if (this.card.get('value').hasError('required')) {
      return 'Campo obligatorio';
    } else if (this.card.get('value').hasError('min')) {
      return 'Mínimo 12.000 COP';
    } else if (this.card.get('value').hasError('max')) {
      return 'Máximo 2\'300.000 COP';
    }
  }

  getErrorMessageValueNEQUI(): string {
    if (this.nequi.get('value').hasError('required')) {
      return 'Campo obligatorio';
    } else if (this.nequi.get('value').hasError('min')) {
      return 'Mínimo 12.000 COP';
    } else if (this.nequi.get('value').hasError('max')) {
      return 'Máximo 2\'300.000 COP';
    }
  }

  getErrorMessageValuePSE(): string {
    if (this.pse.get('value').hasError('required')) {
      return 'Campo obligatorio';
    } else if (this.pse.get('value').hasError('min')) {
      return 'Mínimo 12.000 COP';
    } else if (this.pse.get('value').hasError('max')) {
      return 'Máximo 2\'300.000 COP';
    }
  }

  getErrorMessageValueBancolombia(): string {
    if (this.bancolombia.get('value').hasError('required')) {
      return 'Campo obligatorio';
    } else if (this.bancolombia.get('value').hasError('min')) {
      return 'Mínimo 12.000 COP';
    } else if (this.bancolombia.get('value').hasError('max')) {
      return 'Máximo 2\'300.000 COP';
    }
  }

  /**
   * Mensaje de error del tefono
   */
  getErrorMessagePhone(): string {
    if (this.nequi.get('number').hasError('required')) {
      return 'Campo obligatorio';
    } else if (this.nequi.get('number').hasError('min')) {
      return 'Mínimo 1.000 COP';
    } else if (this.nequi.get('number').hasError('max')) {
      return 'Máximo 2\'300.000 COP';
    }
  }

  /**
   * Mensaje de error del tefono
   */
  getErrorMessageDocumentPSE(): string {
    if (this.pse.get('user_id').hasError('required')) {
      return 'Campo obligatorio';
    } else if (this.pse.get('user_id').hasError('minlength')) {
      return 'Mínimo 3 digitos';
    } else if (this.pse.get('user_id').hasError('maxlength')) {
      return 'Máximo 15 digitos';
    }
  }

  getCoupon(){
    this.coupon.markAllAsTouched();
    if(this.coupon.valid){
      this.preload_coupon= true;
      let code = this.coupon.get('coupon_code').value;
      this.couponsService.getCouponByCode(code).subscribe(res=>{
        this.coupon_user=res;
        this.preload_coupon= false;
        
        // let discount = (100 - this.coupon_user.discount_percent)/100;
        // this.value_total = (this.data.cost*discount) + this.commission
        
        this.calculateCommissionAndTotalValue();
        this.notifyService.showSuccess('Aviso', 'El codigo ingresado fue correcto');
      }, err => {
        if(err.status==404){
          this.coupon_user=null;
          this.notifyService.showError('Aviso', 'El cupon con el codigo ingresado no existe.');
        }
        this.preload_coupon= false;
      });
    }
  }

  showCoupon(){
    this.show_coupon= !this.show_coupon;
    this.coupon.get('coupon_code').setValue('');
    this.coupon_user= null;
    this.calculateCommissionAndTotalValue();
  }

  async payFreeCuopon(): Promise<any> {
    this.preload_coupon= true;
    let transacction={
      coupon_code: this.coupon_user?.code,
      plan_id: this.data.id
    }
    const liquidationId = ManageSessionStorage.getAndRemoveLastSavedLiquidationId();
    this.paymentService.paymentFreeCoupon(transacction).subscribe(res=>{
      this.preload_coupon= false;
      if (liquidationId) {
        this.router.navigate([`lobby/liquidations-detail/${liquidationId}`]);
      } else {
        this.router.navigate(['lobby']);
      }
      this.matDialogRef.close();
      this.notifyService.showSuccess('Aviso', 'Transaccion realizada exitosamente.');
    },err=>{
      this.preload_coupon= false;
      this.notifyService.showError('Aviso', 'Error al hacer el pago.');
    })

  }
}
