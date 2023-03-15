const { error } = require("./src/constants");
const File = require("./src/file");
const { deepStrictEqual, rejects } = require("assert");

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    expected = [
      {
        name: "Erick Wendel",
        id: 1,
        profession: "Javascript Instructor",
        birthDay: 1998,
      },
      {
        name: "Cirineu Rodrigues",
        id: 2,
        profession: "Desenvolvedor",
        birthDay: 1999,
      },
      {
        name: "Joãozinho da Silva",
        id: 3,
        profession: "Jogador",
        birthDay: 2003,
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
