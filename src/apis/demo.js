import services from "../tools/services/services";
// import services from "wk-bz-common/src/services/services";

export default {
  /**
   * 获取课程管理列表
   * @param {*} params
   */
  getCourseList(params) {
    return services.post(`${process.env.VUE_APP_API}course/getCoursePage`, params, {
      action: "课程列表"
    });
  }
};
