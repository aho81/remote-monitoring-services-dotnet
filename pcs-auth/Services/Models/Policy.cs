// Copyright (c) Microsoft. All rights reserved.

using System.Collections.Generic;

namespace Microsoft.Azure.IoTSolutions.Auth.Services.Models
{
    public class Policy
    {
        public string Role { get; set; }
        public List<string> AllowedActions { get; set; }

        public Policy()
        {
            this.Role = string.Empty;
            this.AllowedActions = new List<string>();
        }
    }
}
