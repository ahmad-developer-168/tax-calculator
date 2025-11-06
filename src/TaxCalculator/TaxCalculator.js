import {InputText} from "primereact/inputtext";
import React, {useState} from "react";
import { Col, Row} from "react-bootstrap";
import {Button} from "primereact/button";

const TaxCalculator = () => {
    const [salary, setSalary] = useState("");
    const [salaryMsg, setSalaryMsg] = useState(false);
    const [taxMonthlyAmount, setTaxMonthlyAmount] = useState("");
    const [taxYearlyAmount, setTaxYearlyAmount] = useState("");
    const [providentFund, setProvidentFund] = useState("");
    const [salaryAfterDeduction, setSalaryAfterDeduction] = useState("");
    const  eobi = 370;

    const handleReset = () => {
        setSalary("");
        setTaxMonthlyAmount("");
        setTaxYearlyAmount("");
        setProvidentFund("");
        setSalaryMsg(false);
        setSalaryAfterDeduction("");
    }

    const handleTaxCalculate = () => {
        if (salary === "" && providentFund === "") {
            setSalaryMsg(true);
        }
        else if (providentFund !== "" && salary === "") {
            const calProvdntFund= providentFund * 20
            const finalProvdntFund = calProvdntFund / 0.6667;
            const remainder = finalProvdntFund % 1000;

            let roundedSalary;
            if (remainder < 500) {
                // Agar last 3 digits 500 se kam hain → round down
                roundedSalary = finalProvdntFund - remainder;
            } else {
                // Agar 500 ya us se zyada hain → round up
                roundedSalary = finalProvdntFund + (1000 - remainder);
            }
            setSalary(Math.round(roundedSalary));
        }
        else if (salary !== "" && providentFund === "") {
            setSalaryMsg(false);
            const yearlySalary = salary * 12;
            const calculateProvdntFnd = salary * .6667;
            const calculatedProvdntFnd = calculateProvdntFnd * 0.05;
            const decimalPart = calculatedProvdntFnd - Math.floor(calculatedProvdntFnd);
            let roundedProvdntFnd;

            if (decimalPart < 0.5) {
                roundedProvdntFnd = Math.floor(calculatedProvdntFnd);
            } else {
                roundedProvdntFnd = Math.ceil(calculatedProvdntFnd);
            }
            setProvidentFund(roundedProvdntFnd);

            if(yearlySalary <= 600000) {

            }
            else if (yearlySalary > 600000 && yearlySalary <= 1200000) {
                const exceededAmount = yearlySalary - 600000;
                const taxDeduction = exceededAmount * 0.01;
                const finalTax = taxDeduction / 12;
                setTaxMonthlyAmount(finalTax);
                setTaxYearlyAmount(taxDeduction);
                const salaryAfterTaxDeduction = salary - roundedProvdntFnd - finalTax - eobi;
                setSalaryAfterDeduction(salaryAfterTaxDeduction);
            }
            else if (yearlySalary > 1200000 && yearlySalary <= 2200000) {
                const exceededAmount = yearlySalary - 1200000;
                const taxDeduction = (exceededAmount * 0.11) + 6000;
                const finalTax = taxDeduction / 12;
                setTaxMonthlyAmount(finalTax);
                setTaxYearlyAmount(taxDeduction);
                const salaryAfterTaxDeduction = salary - roundedProvdntFnd - finalTax - eobi;
                setSalaryAfterDeduction(salaryAfterTaxDeduction);
            }
            else if (yearlySalary > 2200000 && yearlySalary <= 3200000) {
                const exceededAmount = yearlySalary - 2200000;
                const taxDeduction = (exceededAmount * 0.23) + 116000;
                const finalTax = taxDeduction / 12;
                setTaxMonthlyAmount(finalTax);
                setTaxYearlyAmount(taxDeduction);
                const salaryAfterTaxDeduction = salary - roundedProvdntFnd - finalTax - eobi;
                setSalaryAfterDeduction(salaryAfterTaxDeduction);
            }
            else if (yearlySalary > 3200000 && yearlySalary <= 4100000) {
                const exceededAmount = yearlySalary - 3200000;
                const taxDeduction = (exceededAmount * 0.30) + 346000;
                const finalTax = taxDeduction / 12;
                setTaxMonthlyAmount(finalTax);
                setTaxYearlyAmount(taxDeduction);
                const salaryAfterTaxDeduction = salary - roundedProvdntFnd - finalTax - eobi;
                setSalaryAfterDeduction(salaryAfterTaxDeduction);
            }
            else if (yearlySalary > 4100000) {
                const exceededAmount = yearlySalary - 4100000;
                const taxDeduction = (exceededAmount * 0.35) + 616000;
                const finalTax = taxDeduction / 12;
                setTaxMonthlyAmount(finalTax);
                setTaxYearlyAmount(taxDeduction);
                const salaryAfterTaxDeduction = salary - roundedProvdntFnd - finalTax - eobi;
                setSalaryAfterDeduction(salaryAfterTaxDeduction);
            }
        }
    }

    return (
        <div className="container-fluid p-4">
            <Row>
                <Col xs={12} sm={12} md={4} lg={4} >
                    <InputText
                        className="w-100"
                        value={salary}
                        onChange={(e) => {
                            setSalary(e.target.value);
                            setSalaryMsg(false);
                        }}
                        placeholder="Enter your salary"
                    />
                    { salaryMsg === true ?
                        <span style={{color: "red"}}>Please enter your salary</span>
                        : null
                    }
                </Col>
            </Row>
            <div className='mt-3 mb-3'>
                <Button className="mybtn me-3" onClick={handleTaxCalculate} disabled={providentFund && salary}>Calculate</Button>
                <Button className="mybtn" onClick={handleReset}>Reset</Button>
            </div>

            <hr></hr>

            <Row>
                <Col xs={12} sm={12} md={4} lg={4} >
                    <label>Provident Fund Deduction</label>
                    <InputText
                        className="w-100"
                        value={providentFund}
                        onChange={(e) => {
                            setProvidentFund(e.target.value);
                        }}
                    />
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} >
                    <label>Monthly Tax Deduction</label>
                    <InputText
                        className="w-100"
                        value={taxMonthlyAmount}
                    />
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} >
                    <label>Yearly Tax Deduction</label>
                    <InputText
                        className="w-100"
                        value={taxYearlyAmount}
                    />
                </Col>
            </Row>
            <hr></hr>
            <Row>
                <Col xs={12} sm={12} md={4} lg={4}>
                    <label>Salary After Deduction</label>
                    <InputText
                        className="w-100"
                        value={salaryAfterDeduction}
                    />
                </Col>
            </Row>
        </div>
    )
}
export default TaxCalculator;