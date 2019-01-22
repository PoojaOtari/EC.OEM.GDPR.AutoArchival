using System;
using System.Collections.Generic;
using System.IO;
//using Microsoft.SqlServer.TransactSql.ScriptDom;

namespace trial.api.Controllers
{
    public static class SqlParser
    {
        public static List<string> Parse(string sql)
        {
            /*
            TSql100Parser parser = new TSql100Parser(false);
            TSqlFragment fragment;

            IList<ParseError> errors;


            fragment = parser.Parse(new StringReader(sql), out errors);


            if (errors != null && errors.Count > 0)
            {
                List<string> errorList = new List<string>();
                foreach (var error in errors)
                {
                    errorList.Add(error.Message);
                }
                return errorList;
            }
            */
            return null;
        }
    }
}

