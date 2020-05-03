package lk.health.phd.cd.dao.impl;

import lk.health.phd.cd.dao.PatientDao;
import lk.health.phd.cd.models.Patient;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

@Repository("patientDao")
public class PatientDaoImpl extends UniversalDaoImpl<Patient> implements PatientDao {

    public Patient getPatientById(final Long inId){
        Session session = getCurrentSession();

        return (Patient) session.createCriteria(Patient.class).add(Restrictions.eq("id", inId)).uniqueResult();
    }

    @Override
    public Patient getPatientByPatientId(String inPatientId){
        Session session = getCurrentSession();

        return (Patient) session.createCriteria(Patient.class).add(Restrictions.eq("patientId", inPatientId))
                .uniqueResult();
    }

}
