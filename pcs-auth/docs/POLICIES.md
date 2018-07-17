Policies
========

Policies are used to determine allowed actions for specific users. For example, by updating the *roles.json* for user roles, you can specify which actions are allowed for each role.

Role Policy Example:
```json
{
    "Items": [
        {
            "Id": "a400a00b-f67c-42b7-ba9a-f73d8c67e433",
            "Role": "admin",
            "AllowedActions": [
                "DeleteAlarms",
                "UpdateAlarms",
                "CreateDevices",
                "DeleteDevices",
                "UpdateDevices",
                "CreateDeviceGroups",
                "DeleteDeviceGroups",
                "UpdateDeviceGroups",
                "CreateRules",
                "UpdateRules",
                "DeleteRules",
                "CreateJobs",
                "UpdateSimManagement"
            ]
        },
        {
            "Id": "e5bbd0f5-128e-4362-9dd1-8f253c6082d7",
            "Role": "readOnly",
            "AllowedActions": []
        }
    ]
}
```