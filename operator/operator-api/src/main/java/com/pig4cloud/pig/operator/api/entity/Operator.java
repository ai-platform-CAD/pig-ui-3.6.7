package com.pig4cloud.pig.operator.api.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.pig4cloud.pig.common.mybatis.base.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import com.alibaba.fastjson.JSONObject;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("Operator")
@Schema(name = "算子表")
public class Operator extends BaseEntity {
	@TableId(type = IdType.ASSIGN_ID)
	@Schema(name = "operatorId")
	private Long operatorId;

	@Schema(name = "算子名称")
	private String operatorName;

	@Schema(name = "JSON内容")
	private JSONObject jsonContent;

}
