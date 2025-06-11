import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { useProvider } from '../hooks/Provider';
import toast from 'react-hot-toast';

function VacationCalendar() {
  const {
    selectedDates,
    setSelectedDates,
    selectedLocale,
    calendarRef,
    isLimitReached,
  } = useProvider();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  function handleResetClick() {
    setShowModal(true); // Открыть модальное окно
  }

  function handleCancelReset() {
    setShowModal(false); // Закрыть модальное окно
  }

  function handleConfirmReset() {
    setSelectedDates([]); // Сбросить даты
    setShowModal(false); // Закрыть модальное окно
    toast.success(t('All selected days have been reset')); // Показать уведомление
  }

  return (
    <div ref={calendarRef}>
      {isLimitReached ? (
        <p className='limit-reached text-center text-primary'>
          {t('Limit reached')}
        </p>
      ) : (
        <p style={{ height: '24px' }}> </p>
      )}
      <button
        type='button'
        className='btn btn-primary text-white d-block m-auto mb-3'
        onClick={() => {
          toast.error('Это сообщение от библиотеки react-hot-toast!');
        }}
      >
        Show toast
      </button>
      <DayPicker
        id='calendar'
        mode='multiple'
        weekStartsOn='1'
        captionLayout='dropdown'
        locale={selectedLocale}
        selected={selectedDates}
        onSelect={setSelectedDates}
      />
      <button
        type='button'
        className='btn btn-primary text-white d-block m-auto'
        onClick={handleResetClick}
      >
        {t('Reset days')}
      </button>

      {/* Modal for confirmation */}
      <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        style={{ display: showModal ? 'block' : 'none' }}
        tabIndex='-1'
        aria-labelledby='resetModalLabel'
        aria-hidden={!showModal}
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5
                className='modal-title text-center text-danger w-100'
                id='resetModalLabel'
              >
                {t('Attention!')}
              </h5>
              <button
                type='button'
                className='btn-close'
                onClick={handleCancelReset}
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body text-center'>
              {t('Do you really want to drop all the chosen days?')}
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={handleCancelReset}
              >
                {t('Cancel')}
              </button>
              <button
                type='button'
                className='btn btn-danger'
                onClick={handleConfirmReset}
              >
                {t('Reset')}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Фон для модального окна */}
      {showModal && <div className='modal-backdrop fade show'></div>}
    </div>
  );
}

export default VacationCalendar;
