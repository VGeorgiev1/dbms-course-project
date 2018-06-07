const mysql = require('mysql');
function toSQLColumn(table, column) {
    if(column.includes('.'))
        return column
    return `${table}.${column}`
}

class Query {
    constructor(select, from, where) {
        this.select = select.map(column => toSQLColumn(from, column));
        this.from = from;
        this.joins = [];
        this.where_clauses = where || [];
    }

    join(type, on, columns) {
        let otherTableName = other.tableName;
        this.select.push(...columns.map(column => toSQLColumn(otherTableName, column)))
        this.joins.push({
            type: type,
            with: otherTableName,
            on: on
        })
        return this
    }

    inner_join(other, on, columns) {
        return join('INNER', on, columns)
    }
    left_join(other, on, columns) {
        return join('LEFT', on, columns)
    }

    where(args) {
        Object.assign(this.where_clauses, args)
        return this
    }

    execute() {
        let query = `
SELECT ${this.select.join(', ')}
FROM   ${this.from}
${this.joins.map(j => `${j.type} JOIN ${j.with} 
    ON ${toSQLColumn(this.from, j.on[0])} = ${toSQLColumn(j.with, j.on[1])}`).join('\n')}
WHERE ${Object.keys(this.where_clauses).fill('?? = ?').join(' AND ')};`;
        let args = [].concat(...Object.entries(this.where_clauses));
        console.log(query, args)
        return require('./Model').execQuery(query, args);
    }
}

module.exports = Query