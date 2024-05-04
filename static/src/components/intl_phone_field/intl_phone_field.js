/** @odoo-module **/

import { registry } from '@web/core/registry';
import { PhoneField } from '@web/views/fields/phone/phone_field';
import { onWillStart, onMounted, useRef, useState } from '@odoo/owl';
import { loadJS, loadCSS } from '@web/core/assets';
import { useService } from '@web/core/utils/hooks';

export class IntlPhoneField extends PhoneField {
  setup() {
    super.setup();
    console.log('Inherit Widget Phone');

    this.phoneInput = useRef('input');
    this.state = useState({
      isValidNumber: false,
      iti: undefined,
    });

    this.notificationService = useService('notification');

    onWillStart(async () => {
      await loadCSS(
        '/owl_tips/static/src/lib/intl-tel-input/build/css/intlTelInput.css'
      );
      await loadJS(
        '/owl_tips/static/src/lib/intl-tel-input/build/js/intlTelInput.min.js'
      );
    });

    onMounted(() => {
      this.state.iti = intlTelInput(this.phoneInput.el, {
        utilsScript:
          '/owl_tips/static/src/lib/intl-tel-input/build/js/utils.js',
      });
    });
  }
  validate() {
    if (this.state.iti) {
      this.state.isValidNumber = this.state.iti.isValidNumber();
    }
    if (this.state.isValidNumber) {
      this.notificationService.add('El teléfono es válido', {
        title: 'Validación del teléfono',
        type: 'success',
        sticky: false,
        className: 'rounded-3',
      });
    } else {
      this.notificationService.add('El teléfono no es válido', {
        title: 'Validación del teléfono',
        type: 'danger',
        sticky: false,
        className: 'rounded-3',
      });
    }
    console.log(this.state.isValidNumber);
  }
}

IntlPhoneField.template = 'owl_tips.IntlPhoneField';

export const intlPhoneFieldProps = {
  component: IntlPhoneField,
};

registry.category('fields').add('intl_phone', intlPhoneFieldProps);
