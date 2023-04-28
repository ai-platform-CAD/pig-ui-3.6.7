package com.pig4cloud.pig.operator.api.vo;

import com.alibaba.fastjson.JSONObject;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class OperatorVO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long operatorId;

	private String operatorName;

	private JSONObject jsonContent;

	private LocalDateTime createTime;
}
