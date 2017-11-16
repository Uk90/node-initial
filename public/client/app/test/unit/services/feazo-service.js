(function() {
  'use strict';

  angular
    .module('app')
    .service('FeazoCalculationService', FeazoCalculationService);

  /**
   * @ngdoc Injector
   * @name FeazoCalculationService
   * @description
   * Feazo Calculation Service module service injection
   * @module app
   * @author Ideas2IT Technologies
   */
  FeazoCalculationService.$inject = [];

  /**
   * @ngdoc Service
   * @name FeazoCalculationService
   * @description feasibility service
   * @module app
   * @author Ideas2IT Technologies
   */
  function FeazoCalculationService() {

    var _self = this;

    /**
     * @ngdoc project calculations
     * @name _self.getFeazoCalculation
     * @desc Calculate project user data
     * @param {object} feazoInputData
     */
    _self.getFeazoCalculation = function(feazoInputData) {
      // Get gstOnLandValue based on gstOnLand input 'yes' or 'no'
      feazoInputData.gstOnLandValue = feazoInputData.gstOnLand === 'yes' ? (parseFloat(feazoInputData.landValue) * (parseFloat(feazoInputData.gstPerc)/100)) : 0.00;

      // Get stampDuty value based on stampDutyPercentage
      feazoInputData.stampDuty = ((parseFloat(feazoInputData.landValue) + parseFloat(feazoInputData.gstOnLandValue)) * (parseFloat(feazoInputData.stampDutyPercentage)/100));

      feazoInputData.legalAcquistion = ( parseFloat(feazoInputData.landValue) * (parseFloat(feazoInputData.legalAcquistionPercentage)/100) );

      feazoInputData.totalAcquistionCost = (parseFloat(feazoInputData.landValue) + parseFloat(feazoInputData.gstOnLandValue) + parseFloat(feazoInputData.stampDuty) + parseFloat(feazoInputData.legalAcquistion));

      feazoInputData.landValuePerUnits = (parseFloat(feazoInputData.totalAcquistionCost) /  parseFloat(feazoInputData.totalNumberOfUnits)) || 0;

      if(feazoInputData.constructionCostValue === 'unit') {
        feazoInputData.totalConstructionCostPerUnit = parseFloat(feazoInputData.constructionCost);
      } else {
        feazoInputData.totalConstructionCostPerUnit = parseFloat(feazoInputData.averageConstructionArea) * parseFloat(feazoInputData.constructionCost);
      }

      feazoInputData.totalConstructionCost = parseFloat(feazoInputData.totalConstructionCostPerUnit) * (1 + (parseFloat(feazoInputData.totalConstructionCostPercentage)/100));

      feazoInputData.totalConsultationCost = (parseFloat(feazoInputData.totalConstructionCost) * (parseFloat(feazoInputData.totalConsultationCostPercentage) / 100));
      feazoInputData.totalConsultationCost = feazoInputData.totalConsultationCost.toFixed(2);

      feazoInputData.councilContributions = (((parseFloat(feazoInputData.landValuepercentage)/100) * feazoInputData.landValue) / parseFloat(feazoInputData.totalNumberOfUnits)) || 0 ;
      feazoInputData.councilContributions = feazoInputData.councilContributions.toFixed(2);

      feazoInputData.marketingCommission = parseFloat(feazoInputData.grv) * (parseFloat(feazoInputData.commissionPercentage)/100);

      var GSTPres = (100+parseFloat(feazoInputData.gstPerc))/parseFloat(feazoInputData.gstPerc);
      var netGSTCal1 =  (parseFloat(feazoInputData.gstOnLandValue) / parseFloat(feazoInputData.totalNumberOfUnits)) || 0;
      var netGSTCal2 = (feazoInputData.legalAcquistion / GSTPres) / parseFloat(feazoInputData.totalNumberOfUnits) || 0;
      var netGSTCal3 = parseFloat(feazoInputData.totalConstructionCost) / GSTPres;
      var netGSTCal4 = parseFloat(feazoInputData.totalConsultationCost) / GSTPres;
      var netGSTCal5 = parseFloat(feazoInputData.marketingCommission) / GSTPres;
      var netGSTCal6 = parseFloat(feazoInputData.miscellaneous) / GSTPres;
      var sumOfNetGSTCal = parseFloat(netGSTCal1) + parseFloat(netGSTCal2) + parseFloat(netGSTCal3) + parseFloat(netGSTCal4) + parseFloat(netGSTCal5) + parseFloat(netGSTCal6);

      if (feazoInputData.gstOnLand === 'yes') {
        feazoInputData.costGst = (parseFloat(feazoInputData.grv) / GSTPres) - parseFloat(sumOfNetGSTCal);
      }else {
        feazoInputData.costGst = ((parseFloat(feazoInputData.grv) - (parseFloat(feazoInputData.landValue)/parseFloat(feazoInputData.totalNumberOfUnits))) / GSTPres) - parseFloat(sumOfNetGSTCal);
      }

      feazoInputData.totalDeveloperCost = parseFloat(feazoInputData.landValuePerUnits) + parseFloat(feazoInputData.totalConstructionCost) + parseFloat(feazoInputData.totalConsultationCost) + parseFloat(feazoInputData.councilContributions) + parseFloat(feazoInputData.marketingCommission) + parseFloat(feazoInputData.costGst) + parseFloat(feazoInputData.miscellaneous) + parseFloat(feazoInputData.finance);

      feazoInputData.totalProfit = (parseFloat(feazoInputData.grv) - parseFloat(feazoInputData.totalDeveloperCost));

      feazoInputData.devMargin = (parseFloat(feazoInputData.totalProfit) / parseFloat(feazoInputData.totalDeveloperCost)) * 100 || 0;

      feazoInputData.residualValue = (parseFloat(feazoInputData.grv) / ( 1 + (parseFloat(feazoInputData.targetDM)/100) )) - (parseFloat(feazoInputData.totalConstructionCost) + parseFloat(feazoInputData.totalConsultationCost) + parseFloat(feazoInputData.councilContributions) + parseFloat(feazoInputData.marketingCommission) + parseFloat(feazoInputData.costGst) + parseFloat(feazoInputData.miscellaneous) + parseFloat(feazoInputData.finance));

      feazoInputData.prsv = ((parseFloat(feazoInputData.residualValue) * parseFloat(feazoInputData.totalNumberOfUnits))/(1 + (parseFloat(feazoInputData.stampDutyPercentage)/100)));
      return feazoInputData;
    };

    /**
     * @ngdoc project calculations
     * @name _self.getFeazoCalculationByGRV
     * @desc Calculate project user data
     * @param {object} feazoInputData
     */
    _self.getFeazoCalculationByGRV = function(feazoInputData) {
      // Calculate GRV based Finance Cost
      feazoInputData.grvTotalLoanAmount = (parseFloat(feazoInputData.grvLvr)/100) * parseFloat(feazoInputData.grv);
      feazoInputData.grvIntrestPerAnnum = parseFloat(feazoInputData.grvTotalLoanAmount) * (parseFloat(feazoInputData.grvIntrest)/100);
      feazoInputData.grvIntrestPerUnit = (parseFloat(feazoInputData.grvIntrestPerAnnum)) * (feazoInputData.grvPeriods/12);
      feazoInputData.finance = parseFloat(feazoInputData.grvIntrestPerUnit);

      feazoInputData.totalDeveloperCost = parseFloat(feazoInputData.landValuePerUnits) + parseFloat(feazoInputData.totalConstructionCost) + parseFloat(feazoInputData.totalConsultationCost) + parseFloat(feazoInputData.councilContributions) + parseFloat(feazoInputData.marketingCommission) + parseFloat(feazoInputData.costGst) + parseFloat(feazoInputData.miscellaneous) + parseFloat(feazoInputData.finance);

      feazoInputData.residualValue = (parseFloat(feazoInputData.grv) / ( 1 + (parseFloat(feazoInputData.targetDM)/100) )) - (parseFloat(feazoInputData.totalConstructionCost) + parseFloat(feazoInputData.totalConsultationCost) + parseFloat(feazoInputData.councilContributions) + parseFloat(feazoInputData.marketingCommission) + parseFloat(feazoInputData.costGst) + parseFloat(feazoInputData.miscellaneous) + parseFloat(feazoInputData.finance));

      feazoInputData.prsv = (parseFloat(feazoInputData.residualValue) *  parseFloat(feazoInputData.totalNumberOfUnits))/(1 + (parseFloat(feazoInputData.stampDutyPercentage)/100));

      feazoInputData.totalProfit = (parseFloat(feazoInputData.grv) - parseFloat(feazoInputData.totalDeveloperCost));

      feazoInputData.devMargin = (parseFloat(feazoInputData.totalProfit) / parseFloat(feazoInputData.totalDeveloperCost)) * 100 || 0;

      return feazoInputData;
    }

    /**
     * @ngdoc project calculations
     * @name _self.getFeazoCalculationByTDC
     * @desc Calculate project user data
     * @param {object} feazoInputData
     */
    _self.getFeazoCalculationByTDC = function(feazoInputData) {
      //Calculate TDC based Finance Cost
      feazoInputData.totalDeveloperCost = parseFloat(feazoInputData.landValuePerUnits) + parseFloat(feazoInputData.totalConstructionCost) + parseFloat(feazoInputData.totalConsultationCost) + parseFloat(feazoInputData.councilContributions) + parseFloat(feazoInputData.marketingCommission) + parseFloat(feazoInputData.costGst) + parseFloat(feazoInputData.miscellaneous);

      var lvrCal = parseFloat(feazoInputData.tdcLVR) / 100;
      var intrestCal = parseFloat(feazoInputData.tdcIntrest) / 100;
      var calMonth = parseFloat(feazoInputData.tdcPeriods) / 12;

      var calcTotal = parseFloat(lvrCal) * parseFloat(intrestCal) * parseFloat(calMonth);
      var calcTotalTdc = parseFloat(calcTotal) * parseFloat(feazoInputData.totalDeveloperCost);
      var divident = 1 - parseFloat(calcTotal);
      var intrest = parseFloat(calcTotalTdc) / parseFloat(divident);
      var newTdc = parseFloat(intrest) + parseFloat(feazoInputData.totalDeveloperCost);
      feazoInputData.tdcTotalLoanAmount = parseFloat(newTdc) * parseFloat(lvrCal);
      feazoInputData.tdcIntrestPerAnnum = parseFloat(feazoInputData.tdcTotalLoanAmount) * parseFloat(intrestCal);
      feazoInputData.tdcLoanAmount = intrest;
      feazoInputData.finance = feazoInputData.tdcLoanAmount;

      feazoInputData.totalDeveloperCost = parseFloat(feazoInputData.landValuePerUnits) + parseFloat(feazoInputData.totalConstructionCost) + parseFloat(feazoInputData.totalConsultationCost) + parseFloat(feazoInputData.councilContributions) + parseFloat(feazoInputData.marketingCommission) + parseFloat(feazoInputData.costGst) + parseFloat(feazoInputData.miscellaneous) + parseFloat(feazoInputData.finance);

      feazoInputData.residualValue = (parseFloat(feazoInputData.grv) / ( 1 + (parseFloat(feazoInputData.targetDM)/100) )) - (parseFloat(feazoInputData.totalConstructionCost) + parseFloat(feazoInputData.totalConsultationCost) + parseFloat(feazoInputData.councilContributions) + parseFloat(feazoInputData.marketingCommission) + parseFloat(feazoInputData.costGst) + parseFloat(feazoInputData.miscellaneous) + parseFloat(feazoInputData.finance));

      feazoInputData.prsv = (parseFloat(feazoInputData.residualValue) * parseFloat(feazoInputData.totalNumberOfUnits))/(1 + (parseFloat(feazoInputData.stampDutyPercentage)/100));

      feazoInputData.totalProfit = (parseFloat(feazoInputData.grv) - parseFloat(feazoInputData.totalDeveloperCost));

      feazoInputData.devMargin = (parseFloat(feazoInputData.totalProfit) / parseFloat(feazoInputData.totalDeveloperCost)) * 100 || 0;

      return feazoInputData;
    };

  }
})();
