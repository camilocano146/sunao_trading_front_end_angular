import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {PaymentService} from 'src/app/services/payment/payment.service';
import {Router} from '@angular/router';
import {Utilities} from '../../../utils/Utilities';
import {ConstantsApp} from '../../../utils/ConstantsApp';
import {Global} from '../../../models/Global';
import {NotifyService} from '../../../services/notify/notify.service';
import {MatDialogRef} from "@angular/material/dialog";

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

  public preload: boolean;
  public preload_pay: boolean;
  public terms: FormControl;
  public link = 'https://wompi.co/wp-content/uploads/2019/09/TERMINOS-Y-CONDICIONES-DE-USO-USUARIOS-WOMPI.pdf';
  public hideCVC = true;

  constructor(
    private router: Router,
    private notifyService: NotifyService,
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    public matDialogRef: MatDialogRef<DialogCreateTransactionComponent>
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
      value: [0, [Validators.required, Validators.min(ConstantsApp.minRechargeTransaction), Validators.max(2300000)]]
    });
    this.nequi = this.formBuilder.group({
      number: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      value: [0, [Validators.required, Validators.min(ConstantsApp.minRechargeTransaction), Validators.max(2300000)]],
      customer_email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(150), Validators.pattern(ConstantsApp.patternEmail)]],
    });
    this.bancolombia = this.formBuilder.group({
      user_type: ['', Validators.required],
      value: [0, [Validators.min(ConstantsApp.minRechargeTransaction), Validators.required]],
      customer_email: ['', [Validators.required, Validators.email, Validators.pattern(ConstantsApp.patternEmail)]],
      payment_description: ['RECARGA JOBKII - BANCOLOMBIA', [Validators.required]]
    });
    this.pse = this.formBuilder.group({
      user_type: ['', Validators.required],
      user_doc: ['', Validators.required],
      user_id: ['', Validators.required],
      institution: ['', Validators.required],
      value: [0, [Validators.min(ConstantsApp.minRechargeTransaction), Validators.required]],
      customer_email: ['', [Validators.required, Validators.email, Validators.pattern(ConstantsApp.patternEmail)]],
      payment_description: ['RECARGA JOBKII - PSE', [Validators.required]]
    });

    this.getPaymenthMethodsAndPretoken();
  }

  ngOnInit(): void {
    // this.getPaymenthMethodsAndPretoken();
    this.paymentService.getInstitutions().subscribe(resp => {
      const bodyInstruction = Utilities.decrypt(resp.body.body);
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
      const body = Utilities.decrypt(res.body.body);
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
  }

  calculateCommissionAndTotalValue(): void {
    let commission = 0;
    let value = 0;
    if (this.payment_method_selected == 'CARD') {
      value = +this.card.value.value;
      commission = Utilities.getCommissionCardPseNequi(value);
    } else if (this.payment_method_selected == 'NEQUI') {
      value = +this.nequi.value.value;
      commission = Utilities.getCommissionCardPseNequi(value);
    } else if (this.payment_method_selected == 'BANCOLOMBIA_TRANSFER') {
      value = +this.bancolombia.value.value;
      commission = Utilities.getCommissionBanColombia(value);
    } else if (this.payment_method_selected == 'PSE') {
      value = +this.pse.value.value;
      commission = Utilities.getCommissionCardPseNequi(value);
    }
    if (value >= ConstantsApp.minRechargeTransaction) {
      this.commission = commission;
      this.value_total = value - this.commission;
    }
    // let data = {value: +val, payment_method: this.payment_method_selected};
    // this.paymentService.valueTotal(data).subscribe(res => {
    //   this.value_total = res.body.body.total;
    //   this.commission = res.body.body.commission;
    //   this.preload_comission = false;
    // }, err => {
    //   this.notifyService.add({ severity: 'error', summary: 'Error', detail: 'No pudimos calcular la comisión de tu pago' });
    //   this.preload_comission = false;
    // });
  }


  async onSubmit(): Promise<any> {
    this.submitted = true;
    if (this.card.invalid) {
      this.card.markAllAsTouched();
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
      exp_month: '' + this.card.value.exp_month,
      exp_year: '' + this.card.value.exp_year,
      card_holder: '' + this.card.value.card_holder
    };
    this.paymentService.tokenCard(infocard).subscribe(response => {
      const token_card = response.body.body.data.id;
      const data = {
        value: +this.card.value.value,
        acceptance_token: this.pre_token,
        token: token_card,
        installments: +this.card.value.installments,
        payment_method: this.payment_method_selected,
        customer_email: this.card.value.customer_email,
        currency: 'COP',
        redirect_url: this.URL_REDIRECT
      };
      this.paymentService.transactionCard(data).subscribe(res => {
        // this.notifyService.add({
        //     severity: 'error',
        //     summary: 'Operación exitosa!',
        //     detail: 'Tu recarga ha sido exitosa.'
        // });
        // this.router.navigate(['/my-transactions/']);
        const transactionBank = Utilities.decrypt(res.body?.body?.transaction_bank);
        const status = transactionBank.data.status;
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
      return;
    }
    if (this.terms.value == false) {
      this.terms.markAsTouched();
      return;
    }
    this.preload_pay = true;
    await this.getPaymenthMethodsAndPretoken();
    const transaction = {
      value: +this.nequi.value.value,
      acceptance_token: this.pre_token,
      payment_method: this.payment_method_selected,
      customer_email: this.nequi.value.customer_email,
      currency: 'COP',
      phone_number: this.nequi.value.number, redirect_url: this.URL_REDIRECT
    };
    this.paymentService.transactionNequi(transaction).subscribe(res => {
      // this.preload_pay = false;
      // this.notifyService.add({
      //     severity: 'error',
      //     summary: 'Operación exitosa!',
      //     detail: 'Tu recarga ha sido exitosa.'
      // });
      // this.router.navigate(['/my-transactions/']);
      const transactionBank = Utilities.decrypt(res.body?.body?.transaction_bank);
      const status = transactionBank.data.status;
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
      return;
    }
    if (this.terms.value == false) {
      this.terms.markAsTouched();
      return;
    }
    this.preload_pay = true;
    await this.getPaymenthMethodsAndPretoken();
    const transaction = {
      value: +this.bancolombia.value.value,
      acceptance_token: this.pre_token,
      payment_method: this.payment_method_selected,
      customer_email: this.bancolombia.value.customer_email,
      currency: 'COP',
      user_type: this.bancolombia.value.user_type,
      payment_description: 'RECARGA JOBKII - BANCOLOMBIA',
      redirect_url: this.URL_REDIRECT
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
      const transactionBank = Utilities.decrypt(res.body?.body?.transaction_bank);
      const status = transactionBank.data.status;
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
      return;
    }
    if (this.terms.value == false) {
      this.terms.markAsTouched();
      return;
    }
    this.preload_pay = true;
    await this.getPaymenthMethodsAndPretoken();
    const transaction = {
      value: +this.pse.value.value,
      acceptance_token: this.pre_token,
      payment_method: this.payment_method_selected,
      customer_email: this.pse.value.customer_email,
      currency: 'COP',
      user_type: +this.pse.value.user_type,
      user_doc: this.pse.value.user_doc,
      user_id: this.pse.value.user_id,
      institution: this.pse.value.institution,
      payment_description: 'RECARGA JOBKII - PSE',
      redirect_url: this.URL_REDIRECT
    };
    this.paymentService.transactionPse(transaction).subscribe(res => {
      const transactionBank = Utilities.decrypt(res.body?.body?.transaction_bank);
      const status = transactionBank.data.status;
      this.showTransactionMessage(status, transactionBank, true);
    }, err => {
      this.preload_pay = false;
      this.notifyService.showError('Error', 'No pudimos realizar tu pago, intenta nuevamente.');
    });

  }

  showTransactionMessage(status, transactionBank, redirectToInvoice?: boolean): void {
    switch (status) {
      case 'APPROVED':
        if (redirectToInvoice) {
          this.notifyService.showSuccess('Aviso', 'En seguida serás redigirido a la página de tu banco.');
          setTimeout(() => {
            window.open(transactionBank?.data?.payment_method?.extra.async_payment_url, '_blank');
            this.router.navigate(['my-transactions']);
            this.preload_pay = false;
          }, 1500);
        } else {
          this.notifyService.showSuccess('Aviso', 'Transaccion realizada exitosamente.');
          setTimeout(() => {
            this.router.navigate(['my-transactions']);
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
        this.notifyService.showError('Aviso', 'Ha surido un error con tu transacción, por favor intenta nuevamente.');
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
}
