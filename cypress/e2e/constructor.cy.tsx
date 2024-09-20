import {
  BURGER_CONSTRUCTOR_SELECTOR,
  CONSTRUCTOR_ELEMENT_ROW_CLASS,
  INGREDIENT_ELEMENT_SELECTOR,
  INGREDIENT_ELEMENT_NAME,
  INGREDIENTS_LIST_SELECTOR,
  MODAL_CLOSE_BUTTON_SELECTOR,
  MODAL_INGREDIENT_TITLE,
  MODAL_WINDOW_SELECTOR,
  url,
  apiUrl
} from './constants';

describe('тестирование функциональности конструктора', () => {
  // перед каждым тестом устанавливаем токены
  beforeEach(() => {
    cy.visit(url);
    cy.viewport('macbook-15');
    Cypress.env('ACCESS_TOKEN', '12345678');
    Cypress.env('REFRESH_TOKEN', '12345678');
    localStorage.setItem('refreshToken', Cypress.env('REFRESH_TOKEN'));
    cy.setCookie('accessToken', Cypress.env('ACCESS_TOKEN'));
  });

  // после каждого теста очищаем localStorage и куки
  afterEach(() => {
    localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
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
    // перехватываем запросы
    cy.intercept(apiUrl, (req) => {
      req.headers.authorization = Cypress.env('ACCESS_TOKEN');
      req.headers.refreshToken = Cypress.env('REFRESH_TOKEN');
    });
  });
});
