using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace clicker_universe_be.Classes.Authorization
{
    [AttributeUsage(AttributeTargets.Method)]
    public class AllowAnonymousAttribute : Attribute
    { }
}
