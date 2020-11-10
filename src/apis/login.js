import services from "../tools/services/services";
export default {
    /**
     * 注册
     * @param params
     */
    login(params) {
        return services.post(`${process.env.VUE_APP_API}api/users/register`,params,  {
            action: "注册"
        });
    },
}