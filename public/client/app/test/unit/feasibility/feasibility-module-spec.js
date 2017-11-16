(function() {
  'use strict';
  describe('Feasibility Module', function() {
    var scope,
      feasibilityCtrl,
      feasibilityService,
      feazoCalculationService;
    var feazoInputs = {
      '1 - Testcase inputs' : {
      'gstOnLand' : 'yes', // input 'yes' or 'no'
      'landValue' : 2640000.00,
      'gstPerc' : 10,
      'stampDutyPercentage' : 5.50, // in percentage(%)
      'legalAcquistionPercentage' : 0.50, // in percentage(%)
      'totalNumberOfUnits' : 12,
      'constructionCost' : 1500,
      'averageConstructionArea' : 167.17,
      'constructionCostValue' : 'unit', // input 'unit' or 'm2'
      'totalConstructionCostPercentage' : 5,
      'totalConsultationCostPercentage' : 2.50,
      'landValuepercentage' : 5,
      'councilContributionCostFlag' : 0,
      'consultationCostFlag' : 0,
      'commissionPercentage' : 1.27, // in percentage(%)
      'grv' : 700000,
      'miscellaneous' : 8000.00,
      'targetDM' : 20, // in percentage(%)
      'grvLvr' : 70,
      'grvIntrest' : 4.50,
      'grvPeriods' : 18,
      'tdcLVR' : 70,
      'tdcIntrest' : 4.50,
      'tdcPeriods' : 18,
      'finance': 0.00
    },
      '2 - Testcase inputs' : {
        'gstOnLand' : 'yes', // input 'yes' or 'no'
        'landValue' : 2640000.00,
        'gstPerc' : 10,
        'stampDutyPercentage' : 5.50, // in percentage(%)
        'legalAcquistionPercentage' : 0.50, // in percentage(%)
        'totalNumberOfUnits' : 12,
        'constructionCost' : 1500,
        'averageConstructionArea' : 167.17,
        'constructionCostValue' : 'm2', // input 'unit' or 'm2'
        'totalConstructionCostPercentage' : 5,
        'totalConsultationCostPercentage' : 2.50,
        'landValuepercentage' : 5,
        'councilContributionCostFlag' : 0,
        'consultationCostFlag' : 0,
        'commissionPercentage' : 1.27, // in percentage(%)
        'grv' : 700000,
        'miscellaneous' : 8000.00,
        'targetDM' : 20, // in percentage(%)
        'grvLvr' : 70,
        'grvIntrest' : 4.50,
        'grvPeriods' : 18,
        'tdcLVR' : 70,
        'tdcIntrest' : 4.50,
        'tdcPeriods' : 18,
        'finance': 0.00
      },
      '3 - Testcase inputs' : {
      'gstOnLand' : 'no', // input 'yes' or 'no'
      'landValue' : 0.00,
      'gstPerc' : 10,
      'stampDutyPercentage' : 5.50, // in percentage(%)
      'legalAcquistionPercentage' : 0.50, // in percentage(%)
      'totalNumberOfUnits' : 12,
      'constructionCost' : 1500,
      'averageConstructionArea' : 167.17,
      'constructionCostValue' : 'm2', // input 'unit' or 'm2'
      'totalConstructionCostPercentage' : 5,
      'totalConsultationCostPercentage' : 2.50,
      'landValuepercentage' : 5,
      'councilContributionCostFlag' : 0,
      'consultationCostFlag' : 0,
      'commissionPercentage' : 1.27, // in percentage(%)
      'grv' : 0.00,
      'miscellaneous' : 8000.00,
      'targetDM' : 20, // in percentage(%)
      'grvLvr' : 70,
      'grvIntrest' : 4.50,
      'grvPeriods' : 18,
      'tdcLVR' : 70,
      'tdcIntrest' : 4.50,
      'tdcPeriods' : 18,
      'finance': 0.00
      }
    };

    beforeEach(function() {
      module('app');
      module('app.feasibility');
    });

    //dashboard controller method test
    describe('FeasibilityController', function() {
      beforeEach(inject(function($rootScope, $controller, _FeasibilityService_, _FeazoCalculationService_) {
        scope = $rootScope.$new();
        feasibilityService = _FeasibilityService_;
        feazoCalculationService = _FeazoCalculationService_;
        feasibilityCtrl = $controller("FeasibilityController", {
          $scope: scope
        });
      }));

      //Test whether getProjectDetails function defined
      it('Should have a getProjectDetails function', function() {
        expect(feasibilityCtrl.getProjectDetails).toBeDefined();
      });

      //Test whether getProjectCalculation function defined
      it('Should have a getProjectCalculation function', function() {
        expect(feasibilityCtrl.getProjectCalculation).toBeDefined();
      });

      //Test whether calculateTdc function defined
      it('Should have a calculateTdc function', function() {
        expect(feasibilityCtrl.calculateTdc).toBeDefined();
      });

      //Test whether financeProjectCalculationApplyGRV function defined
      it('Should have a financeProjectCalculationApplyGRV function', function() {
        expect(feasibilityCtrl.financeProjectCalculationApplyGRV).toBeDefined();
      });

      //Test whether financeProjectCalculationApplyTDC function defined
      it('Should have a financeProjectCalculationApplyTDC function', function() {
        expect(feasibilityCtrl.financeProjectCalculationApplyTDC).toBeDefined();
      });

      //Test whether financeProjectCalculationApplyTDC function defined
      it('Should have a getProjectCalculation function', function() {
        expect(feasibilityService.getProjectCalculation).toBeDefined();
      });

      //Test whether getFeazoCalculation function defined
      it('Should have a getFeazoCalculation function', function() {
        expect(feazoCalculationService.getFeazoCalculation).toBeDefined();
      });

      //Test whether getFeazoCalculationByGRV function defined
      it('Should have a getFeazoCalculationByGRV function', function() {
        expect(feazoCalculationService.getFeazoCalculationByGRV).toBeDefined();
      });

      //Test whether getFeazoCalculationByTDC function defined
      it('Should have a getFeazoCalculationByTDC function', function() {
        expect(feazoCalculationService.getFeazoCalculationByTDC).toBeDefined();
      });

      angular.forEach(feazoInputs, function(project, key) {
        describe("Type " + key, function () {

          var servProject = angular.copy(project);

          it('Should return GST on Land', function() {
            var feazoResponse = feazoCalculationService.getFeazoCalculation(project);
            console.log('============GST ONLAND VALUE=========='+feazoResponse.gstOnLandValue);
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response ======================'+responseQ.gstOnLandValue);
            expect(responseQ.gstOnLandValue).toEqual(feazoResponse.gstOnLandValue);
          });

          it('Should return Stamp Duty Cost', function() {
            var feazoResponse = feazoCalculationService.getFeazoCalculation(project);
            console.log('=========Stamp Duty Cost=============='+feazoResponse.stampDuty);
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response ======================'+responseQ.stampDuty);
            expect(responseQ.stampDuty).toEqual(feazoResponse.stampDuty);
          });

          it('Should return Total Acquisition Costs', function() {
            var feazoResponse = feazoCalculationService.getFeazoCalculation(project);
            console.log('===========Total Acquisition Cost==========='+feazoResponse.totalAcquistionCost);
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.totalAcquistionCost);
            expect(responseQ.totalAcquistionCost).toEqual(feazoResponse.totalAcquistionCost);
          });

          it('Should return Land Value TH/Units', function() {
            var feazoResponse = feazoCalculationService.getFeazoCalculation(project);
            console.log('===========Land Value TH/Units==========='+feazoResponse.landValuePerUnits);

            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.landValuePerUnits);
            expect(responseQ.landValuePerUnits).toEqual(feazoResponse.landValuePerUnits);
          });


          it('Should return Total Construction Cost / Unit', function() {
            var feazoResponse = feazoCalculationService.getFeazoCalculation(project);
            console.log('===========Total Construction Cost / Unit==========='+feazoResponse.totalConstructionCostPerUnit);
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.totalConstructionCostPerUnit);
            expect(responseQ.totalConstructionCostPerUnit).toEqual(feazoResponse.totalConstructionCostPerUnit);
          });

          it('Should return Construction with Contingency Cost by Contingency %', function() {
            var feazoResponse = feazoCalculationService.getFeazoCalculation(project);
            console.log('===========Construction with Contingency Cost ==========='+feazoResponse.totalConstructionCost);

            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.totalConstructionCost);
           expect(responseQ.totalConstructionCost).toEqual( feazoResponse.totalConstructionCost);
          });


          it('Should return Consultants Cost by % of Total Consultation Cost', function(){
            var feazoResponse = feazoCalculationService.getFeazoCalculation(project);
            console.log('===========Consultants Cost by % of Total Consultation Cost ==========='+ feazoResponse.totalConsultationCost);
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.totalConsultationCost);
            expect(responseQ.totalConsultationCost).toEqual( feazoResponse.totalConsultationCost);
          });


          it('Should return Council Contributions by % of Land Value', function() {
            var feazoResponse = feazoCalculationService.getFeazoCalculation(project);
            console.log('===========Council Contributions by % of Land Value ==========='+feazoResponse.councilContributions);

            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.councilContributions);
            expect(responseQ.councilContributions).toEqual(
              feazoResponse.councilContributions);
          });

          it('Should return Marketing Cost by % of Marketing Commission', function() {
            var feazoResponse = feazoCalculationService.getFeazoCalculation(project);
            console.log('===========Marketing Cost by % of Marketing Commission ==========='+feazoResponse.marketingCommission);
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.marketingCommission);
            expect(responseQ.marketingCommission).toEqual(feazoResponse.marketingCommission);
          });


          it('Should return GST Cost by other costs', function() {
            var feazoResponse = feazoCalculationService.getFeazoCalculation(project);
            console.log('===========GST Cost by other costs ==========='+feazoResponse.costGst);
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.costGst);
            expect(parseFloat(responseQ.costGst.toFixed(2))).toEqual(parseFloat(feazoResponse.costGst.toFixed(2)));
          });

          /*Calculate Total Developer Cost(TDC) By Finance(0.00)*/
          it('Should return Total Developer Cost(TDC) by other costs and Finance is 0.00', function() {
            var feazoResponse = feazoCalculationService.getFeazoCalculation(project);
            console.log('===========Total Developer Cost(TDC) by other costs and Finance is 0.00 ==========='+feazoResponse.totalDeveloperCost);
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.totalDeveloperCost);
            expect(parseFloat(responseQ.totalDeveloperCost.toFixed(2))).toEqual(parseFloat(feazoResponse.totalDeveloperCost.toFixed(2)));
          });


          /*Calculate Residual Value of Land / Unit By Finance(0.00)*/
          it('Should return Residual Value of Land / Unit', function() {
            var feazoResponse = feazoCalculationService.getFeazoCalculation(project);
            console.log('===========Residual Value of Land / Unit By Finance(0.00)==========='+feazoResponse.residualValue);
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.residualValue);
            expect(parseFloat(responseQ.residualValue.toFixed(2))).toEqual(parseFloat(feazoResponse.residualValue.toFixed(2)));
          });

          /*Calculate Project Related Site value(PRSV) By Finance(0.00)*/
          it('Should return Project Related Site value(PRSV) by ResidualValue', function(){
            var feazoResponse = feazoCalculationService.getFeazoCalculation(project);
            console.log('===========Project Related Site value by ResidualValue==========='+feazoResponse.prsv);
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.prsv);
            expect(parseFloat(responseQ.prsv.toFixed(2))).toEqual(parseFloat(feazoResponse.prsv.toFixed(2)));
          });

          /*Calculate Total Profit By TDC - Finance(0.00)*/
          it('Should return Total Profit by GRV and TDC-Finance(0.00)', function(){
            var feazoResponse = feazoCalculationService.getFeazoCalculation(project);
            console.log('===========Total Profit by GRV and TDC-Finance(0.00) ==========='+feazoResponse.totalProfit);
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.totalProfit);
            expect(parseFloat(responseQ.totalProfit.toFixed(2))).toEqual(parseFloat(feazoResponse.totalProfit.toFixed(2)));
          });

          /*Calculate Dev margin By TDC - Finance(0.00)*/
          it('Should return Dev margin by Profit and TDC', function(){
            var feazoResponse = feazoCalculationService.getFeazoCalculation(project);
            console.log('===========Dev margin by Profit and TDC-Finance(0.00)==========='+feazoResponse.devMargin);
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.devMargin);
            expect(parseFloat(responseQ.devMargin.toFixed(2))).toEqual(parseFloat(feazoResponse.devMargin.toFixed(2)));
          });

          /**Total Developer Cost(TDC) by Finance Cost - GRV based interest***/
          it('Should return Total Developer Cost(TDC) by Finance Cost - GRV based interest', function(){
            var feazoResponse = feazoCalculationService.getFeazoCalculationByGRV(project);
            console.log('===========Total Developer Cost(TDC) by Finance Cost - GRV based interest ==========='+feazoResponse.totalDeveloperCost);
            servProject.finance = parseFloat(feazoResponse.finance);
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.totalDeveloperCost);
            expect(parseFloat(responseQ.totalDeveloperCost.toFixed(2))).toEqual(parseFloat(feazoResponse.totalDeveloperCost.toFixed(2)));
          });

          /*Calculate Residual Value of Land / Unit By Finance Cost - GRV based interest*/
          it('Should return Residual Value of Land / Unit', function() {
            var feazoResponse = feazoCalculationService.getFeazoCalculationByGRV(project);
            console.log('===========Residual Value of Land / Unit by Finance Cost - GRV based interest==========='+feazoResponse.residualValue);
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.residualValue);
            expect(parseFloat(responseQ.residualValue.toFixed(2))).toEqual(parseFloat(feazoResponse.residualValue.toFixed(2)));
          });

          /*Calculate Project Related Site value(PRSV) By Finance Cost - GRV based interest*/
          it('Should return Project Related Site value(PRSV) by ResidualValue', function(){
            var feazoResponse = feazoCalculationService.getFeazoCalculationByGRV(project);
            console.log('===========Project Related Site value by ResidualValue==========='+feazoResponse.prsv);
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.prsv);
            expect(parseFloat(responseQ.prsv.toFixed(2))).toEqual(parseFloat(feazoResponse.prsv.toFixed(2)));
          });

          /*Calculate Total Profit By TDC - Finance Cost - GRV based interest*/
          it('Should return Total Profit by GRV and TDC-Finance(0.00)', function(){
            var feazoResponse = feazoCalculationService.getFeazoCalculationByGRV(project);
            console.log('===========Total Profit by GRV and TDC-Finance Cost - GRV based interest ==========='+feazoResponse.totalProfit);
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.totalProfit);
            expect(parseFloat(responseQ.totalProfit.toFixed(2))).toEqual(parseFloat(feazoResponse.totalProfit.toFixed(2)));
          });

          /*Calculate Dev margin By TDC - Finance Cost - GRV based interest*/
          it('Should return Dev margin by Profit and TDC', function(){
            var feazoResponse = feazoCalculationService.getFeazoCalculationByGRV(project);
            console.log('===========Dev margin by Profit and TDC - by Finance Cost - GRV based interest==========='+feazoResponse.devMargin);
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.devMargin);
            expect(parseFloat(responseQ.devMargin.toFixed(2))).toEqual(parseFloat(feazoResponse.devMargin.toFixed(2)));
          });

          /**Total Developer Cost(TDC) by Finance Cost - TDC based interest***/
          it('Should return Total Developer Cost(TDC) by Finance Cost - TDC based interest', function(){
            var feazoResponse = feazoCalculationService.getFeazoCalculationByTDC(project);
            console.log('===========Total Developer Cost(TDC) by Finance Cost - TDC based interest ==========='+feazoResponse.totalDeveloperCost);
            servProject.finance = 0.00;
            var TDCCost = feasibilityService.getProjectCalculation(servProject);
            servProject.totalDeveloperCost = TDCCost.totalDeveloperCost;
            var data = feasibilityService.calculateTdc(servProject);
            servProject.finance = data.tdcLoanAmount;
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.totalDeveloperCost);
            expect(parseFloat(responseQ.totalDeveloperCost.toFixed(2))).toEqual(parseFloat(project.totalDeveloperCost.toFixed(2)));
          });

          /*Calculate Residual Value of Land / Unit By Finance Cost - TDC based interest*/
          it('Should return Residual Value of Land / Unit by Finance Cost - TDC based interest', function(){
            var feazoResponse = feazoCalculationService.getFeazoCalculationByTDC(project);
            console.log('===========Residual Value of Land / Unit by Finance Cost - TDC based interest==========='+feazoResponse.residualValue);
            servProject.finance = feazoResponse.finance;
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.residualValue);
            expect(parseFloat(responseQ.residualValue.toFixed(2))).toEqual(parseFloat(feazoResponse.residualValue.toFixed(2)));
          });

          /*Calculate Project Related Site value(PRSV) By Finance Cost - TDC based interest*/
          it('Should return Project Related Site value(PRSV) by ResidualValue', function(){
            var feazoResponse = feazoCalculationService.getFeazoCalculationByTDC(project);
            console.log('===========Project Related Site value by ResidualValue TDC==========='+feazoResponse.prsv);
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.prsv);
            expect(parseFloat(responseQ.prsv.toFixed(2))).toEqual(parseFloat(feazoResponse.prsv.toFixed(2)));
          });

          /*Calculate Total Profit By TDC - Finance Cost - TDC based interest*/
          it('Should return Total Profit by GRV and TDC-Finance Cost - TDC based interest', function(){
            var feazoResponse = feazoCalculationService.getFeazoCalculationByTDC(project);
            console.log('===========Total Profit by GRV and TDC-Finance Cost - TDC based interest ==========='+feazoResponse.totalProfit);
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.totalProfit);
            expect(parseFloat(responseQ.totalProfit.toFixed(2))).toEqual(parseFloat(feazoResponse.totalProfit.toFixed(2)));
          });

          /*Calculate Dev margin By TDC - Finance Cost - TDC based interest*/
          it('Should return Dev margin by Profit and TDC - Finance Cost - TDC based interest', function(){
            var feazoResponse = feazoCalculationService.getFeazoCalculationByTDC(project);
            console.log('===========Dev margin by Profit and TDC - by Finance Cost - TDC based interest==========='+feazoResponse.devMargin);
            var responseQ = feasibilityService.getProjectCalculation(servProject);
            console.log('===============Testcase Service Response======================'+responseQ.devMargin);
            expect(parseFloat(responseQ.devMargin.toFixed(2))).toEqual(parseFloat(feazoResponse.devMargin.toFixed(2)));
          });

        });
      });

    });
  });
})();
