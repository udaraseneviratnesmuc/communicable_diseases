package lk.health.phd.cd.services.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lk.health.phd.cd.controllers.Form544Controller;
import lk.health.phd.cd.dao.Form544Dao;
import lk.health.phd.cd.dao.WorkflowDao;
import lk.health.phd.cd.models.Form544;
import lk.health.phd.cd.models.Workflow;
import lk.health.phd.cd.models.Workflow.WorkflowStatus;
import lk.health.phd.cd.services.WorkflowService;

/**
 * Workflow service
 * 
 * @author admin
 *
 */
@Service("workflowService")
@Transactional
public class WorkflowServiceImpl implements WorkflowService {

	@Autowired
	WorkflowDao workflowDao;

	@Autowired
	Form544Dao form544Dao;

	Logger logger = LoggerFactory.getLogger(WorkflowServiceImpl.class);

	/**
	 * {@inheritDoc}
	 */
	public Long initiateWorkflow() {
		Workflow workflow = new Workflow();
		workflow.setStatus(WorkflowStatus.PROCESSING);
		return workflowDao.save(workflow);
	}

	/**
	 * {@inheritDoc}
	 */
	public Long includeForm544(final Long inWorkflowId, final Form544 inForm544) {
		Long workflowId = null;

		if (inWorkflowId == null) {
			logger.debug("Workflow ID is null");

			form544Dao.save(inForm544);
			logger.debug("Form544 object is persisted.");

			Workflow workflow = new Workflow();
			workflow.setStatus(WorkflowStatus.PROCESSING);
			workflow.setForm544(inForm544);
			workflowId = workflowDao.save(workflow);
			logger.debug("Workflow ID " + workflowId + " has been persisted");
		} else {
			logger.debug("Workflow ID is not null");

			form544Dao.save(inForm544);
			logger.debug("Form544 object is persisted.");

			Workflow workflow = workflowDao.findWorkflowById(inWorkflowId);
			if (workflow != null) {
				logger.debug("Workflow ID " + workflow.getId() + " has been retrived.");
				workflow.setForm544(inForm544);
				workflowDao.update(workflow);
				workflowId = workflow.getId();
				logger.debug("Workflow ID " + workflowId + " has been included Form544 and updated.");
			}
		}

		return workflowId;
	}

}