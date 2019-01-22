using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace trial.api
{
    public class DbContextFactory
    {
        public static string ConnectionString { get; set; }

        public static void SetConnectionString(string connStr)
        {
            ConnectionString = connStr;
        }

        public static DbContext Create(string connid)
        {
            if (!string.IsNullOrEmpty(connid))
            {
                var connStr = connid;
                var optionsBuilder = new DbContextOptionsBuilder<DbContext>();
                return new DbContext(optionsBuilder.Options);

            }
            else
            {
                throw new ArgumentNullException("ConnectionId");
            }
        }
    }
}
