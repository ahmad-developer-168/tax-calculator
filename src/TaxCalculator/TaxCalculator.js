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
        <div className="tc-shell">
            <div className="tc-card">
                <div className="tc-header">
                    <div>
                        <div className="tc-title"><i className="pi pi-calculator" style={{marginRight:8,color:'#22d3ee'}}></i>Income Tax & Provident Fund</div>
                        <div className="tc-sub">Modern, clean and accurate — logic unchanged</div>
                    </div>
                </div>

                <div className="tc-grid">
                    <Row>
                        <Col xs={12} sm={12} md={6} lg={6} >
                            <div className="tc-field">
                                <label>Monthly Salary</label>
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
                                    <span className="tc-note" style={{color: "#ef9a9a"}}>Please enter your salary</span>
                                    : null
                                }
                            </div>
                        </Col>
                    </Row>

                    <div className='tc-actions'>
                        <Button className="mybtn" onClick={handleTaxCalculate} disabled={providentFund && salary}><i className="pi pi-equals" style={{marginRight:8}}></i>Calculate</Button>
                        <Button className="mybtn secondary" onClick={handleReset}><i className="pi pi-refresh" style={{marginRight:8}}></i>Reset</Button>
                    </div>

                    <div className="tc-hr"></div>

                    <Row>
                        <Col xs={12} sm={12} md={4} lg={4} >
                            <div className="tc-field">
                                <label>Provident Fund Deduction</label>
                                <InputText
                                    className="w-100"
                                    value={providentFund}
                                    onChange={(e) => {
                                        setProvidentFund(e.target.value);
                                    }}
                                    placeholder="Calculated or enter manually"
                                />
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4} >
                            <div className="tc-field">
                                <label>Monthly Tax Deduction</label>
                                <InputText
                                    className="w-100"
                                    value={taxMonthlyAmount}
                                    placeholder="Auto-calculated"
                                />
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4} >
                            <div className="tc-field">
                                <label>Yearly Tax Deduction</label>
                                <InputText
                                    className="w-100"
                                    value={taxYearlyAmount}
                                    placeholder="Auto-calculated"
                                />
                            </div>
                        </Col>
                    </Row>

                    <div className="tc-hr"></div>

                    <Row>
                        <Col xs={12} sm={12} md={6} lg={6}>
                            <div className="tc-field">
                                <label>Salary After Deduction</label>
                                <InputText
                                    className="w-100"
                                    value={salaryAfterDeduction}
                                    placeholder="Auto-calculated"
                                />
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6}>
                            <div className="tc-stat">
                                <i className="pi pi-info-circle" style={{color:'#34d399'}}></i>
                                <span className="tc-note">EOBI fixed at 370. PF and tax calculated per existing slabs.</span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
export default TaxCalculator;