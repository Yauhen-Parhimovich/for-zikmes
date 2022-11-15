import '@/styles/main.scss';

document.addEventListener('DOMContentLoaded', () => {

  let inputValue = '';
  const baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  const containerNode = document.querySelector('.form');
  const formInput = containerNode.querySelector('.form__input');
  const formMessage = containerNode.querySelector('.form__message');
  const formButton = containerNode.querySelector('.form__button');
  const loading = document.querySelector('.loading');


  containerNode.addEventListener('submit', submitFormHandler);
  formInput.addEventListener('input', changeInputHandler);

  function changeInputHandler(event) {
    inputValue = event.target.value;
  }

  async function submitFormHandler(event) {
    event.preventDefault();
    if (validateInput(inputValue)) {
      try {
        const data = {
          value: inputValue
        };
        const body = JSON.stringify(data);
        await sendData(baseUrl, body);
        inputValue = '';
        formInput.value = '';
      } catch (e) {
        showMessage(formMessage, e.message);
      }
    } else {
      showMessage(formMessage, 'Введите корректное значение');
      formInput.focus();
    }
  }

  function validateInput(value) {
    return value.trim();
  }

  async function sendData(url, data) {
    try {
      loading.classList.add('_active')
      const res = await fetch(url, {
        method: 'post',
        body: data
      });
      if (res.status === 201) {
        showMessage(formMessage, 'Запрос прошёл успешно');
      }
    } catch (e) {
      throw new Error(e.message);
    }
    finally {
      loading.classList.remove('_active')
    }
  }

  function showMessage(node, message) {
    formButton.disabled = true;
    node.classList.add('_active');
    node.textContent = message;
    setTimeout(() => {
      node.textContent = '';
      node.classList.remove('_active');
      formButton.disabled = false;
    }, 3000);
  }

});
