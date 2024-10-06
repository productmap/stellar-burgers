import {
  apiUrl,
  BURGER_CONSTRUCTOR_SELECTOR,
  CONSTRUCTOR_ELEMENT_ROW_CLASS,
  INGREDIENT_ELEMENT_NAME,
  INGREDIENT_ELEMENT_SELECTOR,
  INGREDIENTS_LIST_SELECTOR,
  MODAL_CLOSE_BUTTON_SELECTOR,
  MODAL_INGREDIENT_TITLE,
  MODAL_WINDOW_SELECTOR,
  MODAL_ORDER_NUMBER,
  ORDER_BUTTON_SELECTOR,
  url
} from './constants';

describe('тестирование функциональности конструктора', () => {
  // перед каждым тестом
  beforeEach(() => {
    cy.visit(url);
    cy.viewport('macbook-15');
  });

  it('Добавление ингредиента из списка ингредиентов в конструктор', () => {
    // получаем списка ингредиентов и первого ингредиента в списке
    cy.get(INGREDIENTS_LIST_SELECTOR)
      .find(INGREDIENT_ELEMENT_SELECTOR)
      .first()
      .as('firstIngredient');

    // добавляем первую булку в конструктор
    cy.get('@firstIngredient').find('button').click();

    // ищем компонент конструктора
    cy.get(BURGER_CONSTRUCTOR_SELECTOR).as('burgerConstructor');

    // проверяем добавления двух булок в конструктор
    cy.get('@burgerConstructor')
      .find(CONSTRUCTOR_ELEMENT_ROW_CLASS)
      .should('have.length', 2);
  });

  it('Открытие и закрытие модального окна с описанием ингредиента', () => {
    // получаем списка ингредиентов и первого ингредиента в списке
    cy.get(INGREDIENTS_LIST_SELECTOR)
      .find(INGREDIENT_ELEMENT_SELECTOR)
      .first()
      .as('firstIngredient');

    // проверя клик на ингредиент
    cy.get('@firstIngredient').click();

    cy.get('@firstIngredient')
      .find(INGREDIENT_ELEMENT_NAME)
      .invoke('text')
      .then((ingredientName) => {
        cy.get(MODAL_WINDOW_SELECTOR)
          .find(MODAL_INGREDIENT_TITLE)
          .should('have.text', ingredientName);
      });

    // закрываем модальное окно
    cy.get(MODAL_CLOSE_BUTTON_SELECTOR).click();
  });

  it('Процесс создания заказа', () => {
    // Переходим на страницу логина
    cy.visit(`${url}/login`);

    // Перехватываем запрос на авторизацию и возвращаем моковый ответ
    cy.intercept('POST', `${apiUrl}/auth/login`).as('login');

    // Вводим данные для логина
    cy.get('input[name="email"]').type('test@rocket.name');
    cy.get('input[name="password"]').type('1234');

    // Нажимаем кнопку логина
    cy.get('button[type="submit"]').click();

    // Ждем, пока запрос на авторизацию завершится
    cy.wait('@login');

    // Проверяем, что перенаправлены на главную страницу
    cy.url().should('include', '/');

    // получаем списка ингредиентов и первого ингредиента в списке
    cy.get(INGREDIENTS_LIST_SELECTOR)
      .find(INGREDIENT_ELEMENT_SELECTOR)
      .first()
      .as('firstIngredient');

    // добавляем первую булку в конструктор
    cy.get('@firstIngredient').find('button').click();

    // отправляем заказ
    cy.get(ORDER_BUTTON_SELECTOR).click();

    // перехватываем запрос на создание заказа и возвращаем моковый ответ
    cy.intercept('POST', `${apiUrl}/orders`, {
      fixture: 'orderResponse.json'
    }).as('order');

    // Ждем, пока запрос заказа обработается
    cy.wait('@order');

    // Проверяем, что номер заказа совпадает с номером из ответа
    cy.get(MODAL_ORDER_NUMBER).should('not.be.empty');
    cy.get(MODAL_ORDER_NUMBER);

    // закрываем модальное окно
    cy.get(MODAL_CLOSE_BUTTON_SELECTOR).last().should('be.visible').click();

    // проверяем что конструктор пустой
    cy.get(BURGER_CONSTRUCTOR_SELECTOR).as('burgerConstructor');
    cy.get('@burgerConstructor')
      .find(CONSTRUCTOR_ELEMENT_ROW_CLASS)
      .should('have.length', 0);

    // очищаем localStorage и куки
    localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });
});
