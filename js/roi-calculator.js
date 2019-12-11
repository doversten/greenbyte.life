/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const industryAverages = {
  agency: [84, 12, 3],
  dev_shop: [84, 23, 3],
  career: [88, 12, 2],
  deals: [83, 7, 1],
  dating: [73, 11, 3],
  commerce: [84, 8, 1],
  education: [79, 18, 2],
  entertainment: [83, 17, 3],
  finance: [82, 14, 2],
  gaming: [72, 8, 3],
  government: [87, 15, 3],
  health: [84, 31, 5],
  insurance: [89, 4, 1],
  marketing: [80, 16, 2],
  media: [76, 12, 2],
  mobile: [82, 36, 7],
  politics: [79, 20, 3],
  professional: [84, 20, 3],
  real_estate: [84, 25, 6],
  religious: [85, 23, 2],
  retail: [86, 18, 5],
  social_media: [87, 12, 2],
  tech: [84, 27, 2],
  telecomm: [63, 9, 1],
  travel: [85, 30, 4],
  other: [84, 22, 3],
  default: [82, 17, 3],
};

$(document).ready(() => {
  const calculator = $('.js-roi-calculator');
  const backButton = $('.js-calculator-back');
  const forwardButton = $('.js-calculator-continue');
  const questions = $('.js-roi-question');
  const fields = $('.js-roi-field');
  const unknownChecks = $('.js-unknown-check');
  const counter = $('.js-calculator-counter');
  const progress = $('.js-calculator-progress');
  const form = $('.js-roi-form');
  const report = $('.js-roi-report');
  const revenueInput = $('.js-revenue-input');
  const lastStep = questions.size();
  let selectedIndustry;

  /**
   * functions
   */
  function setButtonStateOnSelect(select) {
    const hasValue = select.find(':selected').is('[value]');
    forwardButton.toggleClass('is-disabled', !hasValue).prop('disabled', !hasValue);
  }

  function setButtonStateOnTextInput(field) {
    const hasValue = field.val();
    forwardButton.toggleClass('is-disabled', !hasValue).prop('disabled', !hasValue);
  }

  function setButtonAndFieldStateOnCheckbox(check, field) {
    const isCheckedAndHasValue = check.prop('checked') || field.val();
    forwardButton.toggleClass('is-disabled', !isCheckedAndHasValue)
      .prop('disabled', !isCheckedAndHasValue);

    const isChecked = check.prop('checked');
    field.prop('disabled', isChecked);
  }

  function setAverages(industry) {
    const currentIndustry = industryAverages[industry] ? industry : 'default';
    const avgInboxRate = industryAverages[currentIndustry][0];
    const avgOpenRate = industryAverages[currentIndustry][1];
    const avgClickRate = industryAverages[currentIndustry][2];

    // Set industry across all tips and set tip average values
    $('.js-industry').html($('.js-industry-select option:selected').text());
    $('.js-inbox-average').html(avgInboxRate);
    $('.js-open-average').html(avgOpenRate);
    $('.js-click-average').html(avgClickRate);

    // Set default values in fields for given industry
    $('.js-inbox-input').attr('placeholder', avgInboxRate);
    $('.js-open-input').attr('placeholder', avgOpenRate);
    $('.js-click-input').attr('placeholder', avgClickRate);
  }

  function gaDataPush(volume, inboxRate, openRate, clickRate, revenue) {
    const checked = $('#checkbox-revenue').prop('checked') ? 'checked' : 'unchecked';
    dataLayer.push({
      event: 'roiCalculator',
      roiIndustry: selectedIndustry,
      roiAvgVolume: volume,
      roiInboxRate: inboxRate,
      roiOpenRate: openRate,
      roiClickRate: clickRate,
      roiEmailRevenue: revenue,
      roiRevenueCertainty: checked,
    });
  }

  function downloadPDF() {
    const element = document.querySelector('.roi-report__center');
    const opt = {
      margin: [0, -10, 0, -10],
      enableLinks: true,
      filename: 'twilio-sendgrid-roi.pdf',
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().from(element).set(opt).toPdf()
      .get('pdf')
      .then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();
        for (i = 1; i <= totalPages; i += 1) {
          pdf.setPage(i);
          pdf.setFontSize(10);
          pdf.setTextColor(150);
          pdf.text('https://SendGrid.com/pricing | https://SendGrid.com/resource/roi', pdf.internal.pageSize.getWidth() - 160, pdf.internal.pageSize.getHeight() - 20);
        }
      })
      .save();
  }

  function generateReport(volume, inboxRate, openRate, clickRate, revenue) {
    const newInboxRate = inboxRate + 0.01;
    let additionalVolume = (volume * newInboxRate) - (volume * inboxRate);
    let additionalOpens = additionalVolume * openRate;
    let additionalClicks = additionalVolume * clickRate;
    // eslint-disable-next-line no-mixed-operators
    let additionalRevenue = revenue / volume * additionalVolume;

    let v = additionalVolume;
    v = v >= 100000 ? abbreviatedNumber(v, 1) : formattedWholeNumber(v);
    additionalVolume = v;

    let o = additionalOpens;
    o = o >= 100000 ? abbreviatedNumber(o, 1) : formattedWholeNumber(o);
    additionalOpens = o;

    let c = additionalClicks;
    c = c >= 100000 ? abbreviatedNumber(c, 1) : formattedWholeNumber(c);
    additionalClicks = c;

    let r = additionalRevenue;
    r = r >= 100000 ? abbreviatedNumber(r, 1) : formattedWholeNumber(r);
    additionalRevenue = r;

    $('.js-inbox-rate').html(formattedWholeNumber(inboxRate * 100));
    $('.js-new-inbox-rate').html(formattedWholeNumber(newInboxRate * 100));
    $('.js-email-volume').html(additionalVolume);
    $('.js-email-opens').html(additionalOpens);
    $('.js-email-clicks').html(additionalClicks);

    if (revenue === '') {
      $('.js-has-revenue').addClass('is-hidden');
    } else {
      $('.js-has-revenue').removeClass('is-hidden');
      $('.js-email-revenue').html(additionalRevenue);
    }

    $('.js-download-roi-pdf').on('click', () => downloadPDF());
  }

  function updateField() {
    const activeQuestion = $('.js-roi-question').not('.is-hidden');
    const activeField = activeQuestion.find('.js-roi-field');
    const activeUnknownCheck = activeQuestion.find('.js-unknown-check');
    const activePrefix = activeQuestion.find('.js-roi-field-prefix');
    const activeSuffix = activeQuestion.find('.js-roi-field-suffix');

    activeField.focus();

    if (activePrefix.length) {
      activeField.css('padding-left', (activePrefix.width() + 10));
    }

    if (activeSuffix.length) {
      activeField.css('padding-right', (activeSuffix.width() + 10));
    }

    // Check value of active field and set listeners for changes
    if (activeField.is('select')) {
      setButtonStateOnSelect(activeField);
      activeField.change(() => { setButtonStateOnSelect(activeField); });
    }

    if (activeField.is('input:text')) {
      setButtonStateOnTextInput(activeField);
      activeField.on('input', () => { setButtonStateOnTextInput(activeField); });
    }

    if (activeUnknownCheck.length) {
      setButtonAndFieldStateOnCheckbox(activeUnknownCheck, activeField);
      activeUnknownCheck.change(() => {
        setButtonAndFieldStateOnCheckbox(activeUnknownCheck, activeField);
      });
    }
  }

  function changeStep(direction) {
    let step = parseInt(calculator.attr('data-step'), 10);
    // Set industry averages on first step
    if (step === 1) {
      // eslint-disable-next-line no-multi-assign
      selectedIndustry = industry = $('.js-industry-select').val();
      setAverages(industry);
    }

    const volume = $('.js-volume-input').inputmask('unmaskedvalue');
    const inboxRate = $('.js-inbox-input').val() / 100;
    const openRate = $('.js-open-input').val() / 100;
    const clickRate = $('.js-click-input').val() / 100;

    // Increment step up if moving forward and down if moving back
    if (direction === 'forward') {
      step += 1;
    } else if (direction === 'back' && step !== 1) {
      step -= 1;
    }

    // Show back button if not on step 1
    backButton.toggleClass('is-hidden', step === 1);

    // Change continue button text if on last step
    forwardButton.html(step === lastStep ? 'See Results' : 'Continue');

    // Set values and generate report if past step
    if (step > lastStep) {
      const r = revenueInput;
      const revenue = r.is(':disabled') ? '' : r.inputmask('unmaskedvalue');
      generateReport(volume, inboxRate, openRate, clickRate, revenue);
    }

    // Change step on calculator, counter, and progress bar
    calculator.attr('data-step', step);
    counter.html(`${step} of 6`);
    progress.removeClass((index, className) => (className.match(/(^|\s)is-step-\S+/g) || []).join(' '));
    progress.addClass(`is-step-${step}`);

    // Hide/show form and report based on current step
    const isLastStep = step > lastStep;
    report.toggleClass('is-hidden', !isLastStep);
    form.toggleClass('is-hidden', isLastStep);

    // eslint-disable-next-line func-names
    questions.each(function () {
      const question = $(this);
      const stepOnQuestion = question.data('step');

      // Hide and show questions based on step
      if (stepOnQuestion === step) {
        question.removeClass('is-hidden');
        question.find('.js-roi-field').focus();
      } else {
        question.addClass('is-hidden');
      }
    });

    updateField();
    // eslint-disable-next-line no-restricted-globals
    gaDataPush(a = volume !== '' ? volume : null, b = inboxRate !== 0 ? formattedWholeNumber(inboxRate * 100) : null, c = openRate !== 0 ? formattedWholeNumber(openRate * 100) : null, d = clickRate !== 0 ? formattedWholeNumber(clickRate * 100) : null, e = isNaN(revenue) ? null : revenue);
  }

  updateField();

  // Move forward on continue click
  $(document).on('click', '.js-calculator-continue', () => {
    changeStep('forward');
  });

  // Move back on back click
  $(document).on('click', '.js-calculator-back', () => {
    changeStep('back');
  });

  // Hook up enter key to continue button
  fields.keydown((e) => {
    if (e.which === 13) {
      $('.js-calculator-continue').click();
      return false;
    }

    if (e.which === 9 && e.shiftKey) {
      $('.js-calculator-back').click();
      return false;
    }
  });

  // Hook up shift+tab to back button
  unknownChecks.keydown((e) => {
    if (e.which === 13) {
      $('.js-calculator-continue').click();
      return false;
    }
  });
});
