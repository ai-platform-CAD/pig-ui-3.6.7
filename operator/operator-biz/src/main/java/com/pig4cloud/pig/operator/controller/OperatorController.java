/*
 *    Copyright (c) 2018-2025, lengleng All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lengleng (wangiegie@gmail.com)
 */

package com.pig4cloud.pig.operator.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.pig4cloud.pig.common.core.util.R;
import com.pig4cloud.pig.common.log.annotation.SysLog;
import com.pig4cloud.pig.common.security.service.PigUser;
import com.pig4cloud.pig.common.security.util.SecurityUtils;
import com.pig4cloud.pig.operator.api.entity.Operator;
import com.pig4cloud.pig.operator.api.vo.OperatorVO;
import com.pig4cloud.pig.operator.service.OperatorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * Secret表
 *
 * @author sjh
 * @date 2023-02-27 11:06:05
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/operator")
@Tag(name = "算子表管理")
@SecurityRequirement(name = HttpHeaders.AUTHORIZATION)
public class OperatorController {

	private final OperatorService operatorService;

	/**
	 * 分页查询
	 *
	 * @param page 分页对象
	 * @return
	 */
	@Operation(summary = "分页查询", description = "分页查询")
	@GetMapping("/page")
	@PreAuthorize("@pms.hasPermission('operator_manage_get')")
	public R<IPage<List<OperatorVO>>> getOperatorPage(Page page) {
		PigUser user = SecurityUtils.getUser();
		return R.ok(operatorService.getOperatorPageByUserId(page, user.getId()));
	}

	/**
	 * id查询
	 *
	 * @param operatorId operatorId
	 * @return R
	 */
	@Operation(summary = "通过id查询", description = "通过id查询")
	@GetMapping("/{operatorId}")
	@PreAuthorize("@pms.hasPermission('operator_manage_get')")
	public R getById(@PathVariable("operatorId") Long operatorId) {
		return R.ok(operatorService.getById(operatorId));
	}

	/**
	 * 新增
	 *
	 * @param operator operator
	 * @return R
	 */
	@Operation(summary = "新增Secret表", description = "新增Secret表")
	@SysLog("新增算子")
	@PostMapping
	@PreAuthorize("@pms.hasPermission('operator_manage_add')")
	public R save(@RequestBody Operator operator) {
		return R.ok(operatorService.saveOperator(operator));
	}

	/**
	 * 修改
	 *
	 * @param operator operator
	 * @return R
	 */
	@Operation(summary = "修改Secret表", description = "修改Secret表")
	@SysLog("修改算子")
	@PutMapping
	@PreAuthorize("@pms.hasPermission('operator_manage_edit')")
	public R updateById(@RequestBody Operator operator) {
		return R.ok(operatorService.updateOperator(operator));
	}

	/**
	 * 通过id删除Secret表
	 *
	 * @param operatorId operatorId
	 * @return R
	 */
	@Operation(summary = "通过id删除Secret表", description = "通过id删除Secret表")
	@SysLog("通过id删除算子")
	@DeleteMapping("/{operatorId}")
	@PreAuthorize("@pms.hasPermission('operator_manage_del')")
	public R removeById(@PathVariable Long operatorId) {
		return R.ok(operatorService.removeOperatorById(operatorId));
	}

}
