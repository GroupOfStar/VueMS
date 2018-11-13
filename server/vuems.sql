/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50642
Source Host           : localhost:3306
Source Database       : vuems

Target Server Type    : MYSQL
Target Server Version : 50642
File Encoding         : 65001

Date: 2018-11-14 01:26:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `realname` varchar(50) DEFAULT NULL,
  `age` int(10) DEFAULT NULL,
  `rate` decimal(10,1) DEFAULT NULL,
  `idType` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin', '123456', '管理员', '28', '4.9', '42088120091234');
INSERT INTO `users` VALUES ('2', 'guide', '123456', '游客1', '19', '3.7', '42088123122333');
INSERT INTO `users` VALUES ('4', 'zhangsan', '123456', '张三', '37', '4.0', '42381982312343');
INSERT INTO `users` VALUES ('5', 'zhangfei', '123456', '张飞', '56', '3.4', '42077918282234');
INSERT INTO `users` VALUES ('6', 'zhaoyun', '123456', '赵云', '48', '3.5', '34007382977739');
