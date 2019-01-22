using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;

namespace trial.api.Controllers
{
    public class ExternalConnection
    {
      public void GetDatabases(string ServerName)
        {
            SqlConnection conn = new SqlConnection("Data Source= I25OC2DSQLRPT01.partners.extranet.microsoft.com;Initial Catalog=master;Integrated Security=SSPI");
            string connectionString =
            "Data Source= I25OC2DSQLRPT01.partners.extranet.microsoft.com;Initial Catalog=master;Integrated Security=SSPI";

            // Provide the query string with a parameter placeholder.
            string queryString =
                "SELECT database_id, name from vwsysdatabases ";
                    

            // Specify the parameter value.
            //int paramValue = 5;
            //System.Data.sq
            // Create and open the connection in a using block. This
            // ensures that all resources will be closed and disposed
            // when the code exits.
            using (SqlConnection connection =
                new SqlConnection(connectionString))
            {
                // Create the Command and Parameter objects.
                SqlCommand command = new SqlCommand(queryString, connection);
                //command.Parameters.AddWithValue("@pricePoint", paramValue);

                // Open the connection in a try/catch block. 
                // Create and execute the DataReader, writing the result
                // set to the console window.
                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        Console.WriteLine("\t{0}\t{1}\t{2}",
                            reader[0], reader[1], reader[2]);
                    }
                    reader.Close();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
                Console.ReadLine();
            }


        }
        public class DataBase
        {
            public string name { get; set; }
            public int database_id { get; set; }
        }
    }
}
