import {
  url,
  BURGER_CONSTRUCTOR_SELECTOR,
  CONSTRUCTOR_ELEMENT_ROW_CLASS,
  INGREDIENT_ELEMENT_SELECTOR,
  INGREDIENTS_LIST_SELECTOR
} from './constants';

describe('тестирование функциональности конструктора', () => {
  beforeEach(function () {
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

  it('Открытие и закрытие модального окна с описанием ингредиента', () => {});

  it('Отображение в открытом модальном окне данных именно того ингредиента, по которому произошел клик', () => {});

  it('Процесс создания заказа', () => {});
});
