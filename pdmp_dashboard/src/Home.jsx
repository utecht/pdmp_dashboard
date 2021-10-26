import React from "react";

function Home() {

  return (
    <div className="container">
      <h4>Predicting Fatal and Non-Fatal Opioid Overdoses with Prescription Drug Monitoring Program (PDMP) Data Derived Features</h4>
      <small>Bradley C Martin, PharmD, PhD<sup>1</sup>, Mahip Acharya Bpharm<sup>1</sup>, Corey Hayes PharmD, PhD<sup>2</sup>, Austin Porter MPH, DrPH<sup>3,5</sup>, Jamie Turpin PharmD<sup>5</sup>, Jonathan P Bona PhD<sup>4</sup>, Joseph Utecht<sup>4</sup>, Teresa Hudson PharmD., PhD<sup>2</sup> 
1 Division of Pharmaceutical Evaluation and Policy,  2 Department of Psychiatry, 3 Department of Health Policy and Management, 4 Department of Biomedical Informatics, University of Arkansas for Medical Sciences, Little Rock, AR, USA,  5 Arkansas Department of Health, Little Rock, AR, USA</small>
    <h5>Study Aim</h5>
    <p>Current tools to assess opioid overdose risk rely on clinician administered screeners, administrative claims data or are proprietary algorithms that have not reported their accuracy. This study sought to develop an opioid risk prediction tool based exclusively on features derived from PDMP data. </p>
    <h5>Data Source</h5>
    <p>Arkansas (AR) PDMP records, AR statewide emergency department (ED) and hospitalization discharge abstracts and death certificates records between 1 January 2014 and 31 December 2017 were obtained from the Arkansas Department of Health (ADH). These data were probabilistically linked at the patient level using patient identifiers (first/last name, date of birth, gender, and address) to merge the three datasets through the use of probabilistic matching with LinkageWiz software by personnel at the ADH.  Once the records were merged at the patient level, all patient identifiers were deleted from the analytic files permitting access of de-identified data to the larger research team. This study was declared to be exempt from review by The University of Arkansas for Medical Sciences IRB. </p>
    <h5>Primary Outcome</h5>
    <p>Fatal Opioid Overdoses were based on validated ICD10 codes recorded on death certificates
    <br/>
        Non-Fatal Opioid Overdoses were based upon validated ICD-9-CM and ICD-10-CM codes for opioid poisoning in hospital and emergency department discharge abstracts </p>
        <h5>Study Subjects</h5>
<p><strong>Cases:</strong> Subjects with a fatal or non-fatal opioid overdose (OOD) and represented in the PDMP data.
<br/>
<strong>Controls:</strong> Subjects represented in the PDMP data with at least one controlled substance fill  data without experiencing an opioid overdose. </p>

<h5>Features</h5>
<p>114 Features derived from the PDMP data were created and assessed in the 90 days prior to their first OOD (cases) and in the 90 day intervals prior to the last date of a month for which a PDMP record was observed in the prior 90 days (controls).  
<br/>
<br/>
The features were based on  demographics, geographic residence and exposure to individual opioid ingredients, number of prescriptions for each opioid ingredient, total number of opioids, number of unique opioid ingredients, days supply of all opioids, cumulative milligram morphine equivalent (MME), average MME, maximum daily dose, duration of opioid use, long acting opioid use, short acting opioid use, early refills, overlapping opioid use, cash payment, use of benzodiazepines, hypnotics, stimulants, muscle relaxants, overlapping controlled substance and opioid use.</p>
<h5>Analysis</h5>
<p>
Principal components analysis was conducted and the top 12 principal components were retained. Based on the factor loadings, a simple count of the number of prescriptions for each opioid ingredient was used to represent whether each opioid ingredient was prescribed and the quantity of prescribing for that ingredient. After reducing the features for each ingredient, there were 71 features retained. 
<br/>
<br/>
Due to the highly unbalanced data, the ROSE synthetic data generating algorithm was used to represent the feature space of the minority class (OOD). The shrink factor was iteratively tuned so that the synthetic data represented the original data and did not include nonsense values (i.e. negative values for the number of prescriptions).
<br/>
<br/>
The data were randomly split 1:1 into training and test samples. Stepwise logistic regression, random forest and naïve Bayes algorithms were explored. Model discrimination was assessed by calculating c-statistics. Standard measures of accuracy, derived from the confusion matrix are reported.  
</p>

<h5>Results </h5>
<p>There were 1,945,727 subjects and 0.32% experienced one or more overdoses. </p>


<p><strong>Table 1. Demographic Characteristics </strong></p>


<p>The stepwise logistic regression model had the highest level of discrimination compared to the random forest and naïve Bayes machine learning algorithms on the test sample. 68 features were retained in the final stepwise logistic model. The most influential features prognostic for OOD were; number of benzodiazepine prescriptions, number of unique prescribers, region of residence, use of a schedule II long acting opioid, number of pregabalin prescriptions, number of oxycodone prescriptions, and number of morphine prescriptions.</p>
<p><strong>Table 2. Model Performance</strong></p>
<table>
  <thead>
    <tr><th></th><th>Logistic Regression</th><th>Random Forest</th></tr>
  </thead>
  <tbody>
    <tr><td>Sensitivity</td><td>0.6728</td><td>0.6564</td></tr>
    <tr><td>Specificity</td><td>0.7984</td><td>0.7919</td></tr>
    <tr><td>Pos Pred Value</td><td>0.0025</td><td>0.0024</td></tr>
    <tr><td>Neg Pred Value</td><td>0.9997</td><td>0.9997</td></tr>
    <tr><td>Prevalence</td><td>0.0007</td><td>0.0007</td></tr>
    <tr><td>Detection Rate</td><td>0.0005</td><td>0.0005</td></tr>
    <tr><td>Detection Prevalence</td><td>0.2020</td><td>0.2085</td></tr>
    <tr><td>c-statistic</td><td>0.8000</td><td>0.7742</td></tr>
  </tbody>
</table>


<h5>Conclusion</h5>
<p>These results suggest that opioid risk prediction algorithms based exclusively on PDMP derived features can achieve high levels of discrimination that can be used to identify opioid overdose risk. </p>

<h5>Acknowledgements</h5>
<p>This project was supported by Grant No. 2018-PM-BX-0012 awarded by the Bureau of Justice Assistance. The Bureau of Justice Assistance is a component of the Department of Justice's Office of Justice Programs, which also includes the Bureau of Justice Statistics, the National Institute of Justice, the Office of Juvenile Justice and Delinquency Prevention, the Office for Victims of Crime, and the SMART Office. Points of view or opinions in this document are those of the author and do not necessarily represent the official position or policies of the U.S. Department of Justice. Dr. Martin receives royalties from Trestle Tree LLC for the commercialization of an opioid risk prediction tool that used different data sources and different endpoints</p>
    </div>
  );
}

export default Home;
