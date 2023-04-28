USE `pig`;

# -- 菜单SQL
# insert into `sys_menu` (`menu_id`, `parent_id`, `path`,
#                         `permission`, `type`, `icon`, `del_flag`, `create_time`, `sort_order`, `update_time`, `name`)
# values (5100, '-1', '/operator/secret/index',
#         '', '0', 'icon-bangzhushouji', '0', '2018-01-20 13:17:19', '8', '2023-03-01 10:00:00', 'Secret表管理'),
#        (5200, '-1', '/operator/operator/index',
#         '', '0', 'icon-bangzhushouji', '0', '2018-01-20 13:17:19', '8', '2023-03-01 10:00:00', '算子表管理');
#
# # secret
# insert into `sys_menu`(`parent_id`, `menu_id`, `permission`,
#                        `type`, `path`, `icon`, `del_flag`, `create_time`, `sort_order`, `update_time`, `name`)
# values (5100, 5101, 'operator_secret_get',
#         '1', null, '1', '0', '2018-05-15 21:35:18', '0', '2023-03-01 10:01:00', 'Secret表查看'),
#        (5100, 5102, 'operator_secret_add',
#         '1', null, '1', '0', '2018-05-15 21:35:18', '1', '2023-03-01 10:01:00', 'Secret表新增'),
#        (5100, 5103, 'operator_secret_edit',
#         '1', null, '1', '0', '2018-05-15 21:35:18', '2', '2023-03-01 10:01:00', 'Secret表修改'),
#        (5100, 5104, 'operator_secret_del',
#         '1', null, '1', '0', '2018-05-15 21:35:18', '3', '2023-03-01 10:01:00', 'Secret表删除');
# # operator
# insert into `sys_menu`(`parent_id`, `menu_id`, `permission`,
#                        `type`, `path`, `icon`, `del_flag`, `create_time`, `sort_order`, `update_time`, `name`)
# values (5200, 5201, 'operator_operator_get',
#         '1', null, '1', '0', '2018-05-15 21:35:18', '0', '2023-03-01 10:01:00', '算子表查看'),
#        (5200, 5202, 'operator_operator_add',
#         '1', null, '1', '0', '2018-05-15 21:35:18', '1', '2023-03-01 10:01:00', '算子表新增'),
#        (5200, 5203, 'operator_operator_edit',
#         '1', null, '1', '0', '2018-05-15 21:35:18', '2', '2023-03-01 10:01:00', '算子表修改'),
#        (5200, 5204, 'operator_operator_del',
#         '1', null, '1', '0', '2018-05-15 21:35:18', '3', '2023-03-01 10:01:00', '算子表删除');


DROP DATABASE IF EXISTS `operator_orchestration`;

CREATE DATABASE `operator_orchestration` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

USE `operator_orchestration`;

-- ----------------------------
-- Table structure for operator
-- ----------------------------
DROP TABLE IF EXISTS `operator`;
CREATE TABLE `operator`
(
    `operator_id`   bigint                       NOT NULL,
    `operator_name` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '算子名称',
    `json_content`  longtext COLLATE utf8_bin    NOT NULL COMMENT 'JSON内容',
    `create_time`   datetime                     DEFAULT NULL COMMENT '创建时间',
    `create_by`     varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '创建人',
    `update_time`   datetime                     DEFAULT NULL COMMENT '修改时间',
    `update_by`     varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '更新人',
    PRIMARY KEY (`operator_id`),
    KEY `operator_idx1_operator_name` (`operator_name`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_bin
  ROW_FORMAT = DYNAMIC COMMENT ='算子表';

-- ----------------------------
-- Table structure for sys_user_operator
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_operator`;
CREATE TABLE `sys_user_operator`
(
    `user_id`     bigint NOT NULL,
    `operator_id` bigint NOT NULL,
    PRIMARY KEY (`user_id`, `operator_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_bin
  ROW_FORMAT = DYNAMIC COMMENT ='用户算子表';

SET FOREIGN_KEY_CHECKS = 1;