export function transformArrayMySql(sql) {
    if (sql) {
        if (typeof sql != "string" && typeof sql != "object") throw console.error("Não é permitido passar parametros do tipo " + typeof sql)
        var isArray = typeof sql != "string" ? true : false
        if (isArray) return sql.toString();
        else return sql.split(",")
    } else {
        throw console.error("Não é permitido passar parâmetros nulos a função")
    }
}
