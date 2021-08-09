import { knex } from "knex";
// Uncomment and use date-fns if you want.
// import ... from "date-fns";

// Please keep this named export as it is.
export const knexClient = knex({
  client: "sqlite3",
  connection: ":memory:",
  useNullAsDefault: true,
});

// Please keep this named export as it is.
export const migrate = () =>
  knexClient.schema.createTable("events", (table) => {
    table.increments();
    table.dateTime("starts_at").notNullable();
    table.dateTime("ends_at").notNullable();
    table.enum("kind", ["appointment", "opening"]).notNullable();
    table.boolean("weekly_recurring");
  });

const getAvailabilities = async (date) => {
  const res = await getAllData(knexClient, date);
  console.log(res);
  return res;
};
///// added functions ////
const getAllData = (db, date) => {
  /// get from DB
  return db
    .select("*")
    .from("events")
    .where("starts_at", date)
    .orWhere({ starts_at: date.getDate() - 7, weekly_recurring: true })
    .then((rows) => rows);
};

const checkDatesForConfluence = () => {
  var from = "02-05-2013";
  var to = "02-09-2013";
  var check = "02-10-2013";

  console.log();
};

// Please keep this default export as it is.
export default getAvailabilities;
