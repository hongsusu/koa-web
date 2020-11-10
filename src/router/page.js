import loadcomponents from "@/tools/loadcomponents";

export default [
    {
        path: "/",
        children: [
            {
                path: "/form",
                name: "Form",
                meta: {
                    title: "预约表单"
                },
                component: loadcomponents.load("Form", "views", "/pages")
            }
        ],
        component: loadcomponents.load("Index", "views", "")
    }
];
