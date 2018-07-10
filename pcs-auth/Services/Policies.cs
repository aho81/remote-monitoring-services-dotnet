// Copyright (c) Microsoft. All rights reserved.

using System;
using System.Collections.Generic;
using Microsoft.Azure.IoTSolutions.Auth.Services.Models;

namespace Microsoft.Azure.IoTSolutions.Auth.Services
{
    public interface IPolicies
    {
        IEnumerable<Policy> GetList();
        Policy Get(string id);
    }

    public class Policies : IPolicies
    {
        public Policy Get(string id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Policy> GetList()
        {
            throw new NotImplementedException();
        }
    }
}
