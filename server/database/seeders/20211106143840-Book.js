'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'book',
      [
        {
          title: 'Jane Eyre',
          isbn: '1231421251212',
          description: 'my favourite book',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Narnia 1',
          isbn: '9780060765453',
          description: 'kids go to winterland',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Harry Potter à lecole des sorciers',
          isbn: '9782070643028',
          description: 'harry potter 3',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Harry Potter and the Cup of Fire',
          isbn: '9780439139595',
          description: 'harry potter 4',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Harry Potter and the Order of the Phoenix',
          isbn: '9781408855690',
          description: 'harry potter 5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Harry Potter and the Half-Blood Prince',
          isbn: '9780545582995',
          description: 'harry potter 6',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Harry Potter and the Deathly Hallows',
          isbn: '9780545139700',
          description: 'harry potter 7',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Lord of the Rings : Fellowship of the Ring',
          isbn: '9787806573976',
          description: 'Lord of the Rings 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Lord of the Rings : the Two Towers ',
          isbn: '9789706906526',
          description: 'Lord of the Rings 2 ',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Lord of the Rings : the Return of the King',
          isbn: '9780345272607',
          description: 'Lord of the Rings 3',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Song of Ice & Fire 1',
          isbn: '9782298055283',
          description: 'kids go to winterland',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Song of Ice & Fire 2',
          isbn: '9780553801507',
          description: 'kids go to winterland',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Song of Ice & Fire 3',
          isbn: '9780553801507',
          description: 'kids go to winterland',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Song of Ice & Fire 4',
          isbn: '9780553801507',
          description: 'kids go to winterland',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Song of Ice & Fire 5',
          isbn: '9788804581581',
          description: 'kids go to winterland',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          title: 'Da Vinci Code',
          isbn: '9780385504201',
          description: 'kids go to winterland',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Inferno',
          isbn: '9780804172264',
          description: 'kids go to winterland',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Illuminati',
          isbn: '9780743493468',
          description: 'kids go to winterland',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('book', null, {}),
};
