import {InputText} from "primereact/inputtext";
import React, {useEffect, useState} from "react";
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

    const numberFormatter = new Intl.NumberFormat();
    const formatNumber = (value) => {
        if (value === "" || value === null || value === undefined) return "";
        const n = Number((""+value).toString().replace(/,/g, ""));
        if (isNaN(n)) return "";
        return numberFormatter.format(n);
    }
    const parseNumber = (value) => {
        if (value === "" || value === null || value === undefined) return "";
        const cleaned = (""+value).replace(/,/g, "");
        const n = Number(cleaned);
        return isNaN(n) ? "" : n;
    }

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("tc-state") || "{}");
        if (saved.salary !== undefined) setSalary(saved.salary);
        if (saved.providentFund !== undefined) setProvidentFund(saved.providentFund);
        if (saved.taxMonthlyAmount !== undefined) setTaxMonthlyAmount(saved.taxMonthlyAmount);
        if (saved.taxYearlyAmount !== undefined) setTaxYearlyAmount(saved.taxYearlyAmount);
        if (saved.salaryAfterDeduction !== undefined) setSalaryAfterDeduction(saved.salaryAfterDeduction);
    }, []);

    useEffect(() => {
        localStorage.setItem("tc-state", JSON.stringify({
            salary,
            providentFund,
            taxMonthlyAmount,
            taxYearlyAmount,
            salaryAfterDeduction
        }));
    }, [salary, providentFund, taxMonthlyAmount, taxYearlyAmount, salaryAfterDeduction]);

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
            const provFundNum = parseNumber(providentFund);
            const calProvdntFund= provFundNum * 20
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
            const salaryNum = parseNumber(salary);
            const yearlySalary = salaryNum * 12;
            const calculateProvdntFnd = salaryNum * .6667;
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
                const salaryAfterTaxDeduction = salaryNum - roundedProvdntFnd - finalTax - eobi;
                setSalaryAfterDeduction(salaryAfterTaxDeduction);
            }
            else if (yearlySalary > 1200000 && yearlySalary <= 2200000) {
                const exceededAmount = yearlySalary - 1200000;
                const taxDeduction = (exceededAmount * 0.11) + 6000;
                const finalTax = taxDeduction / 12;
                setTaxMonthlyAmount(finalTax);
                setTaxYearlyAmount(taxDeduction);
                const salaryAfterTaxDeduction = salaryNum - roundedProvdntFnd - finalTax - eobi;
                setSalaryAfterDeduction(salaryAfterTaxDeduction);
            }
            else if (yearlySalary > 2200000 && yearlySalary <= 3200000) {
                const exceededAmount = yearlySalary - 2200000;
                const taxDeduction = (exceededAmount * 0.23) + 116000;
                const finalTax = taxDeduction / 12;
                setTaxMonthlyAmount(finalTax);
                setTaxYearlyAmount(taxDeduction);
                const salaryAfterTaxDeduction = salaryNum - roundedProvdntFnd - finalTax - eobi;
                setSalaryAfterDeduction(salaryAfterTaxDeduction);
            }
            else if (yearlySalary > 3200000 && yearlySalary <= 4100000) {
                const exceededAmount = yearlySalary - 3200000;
                const taxDeduction = (exceededAmount * 0.30) + 346000;
                const finalTax = taxDeduction / 12;
                setTaxMonthlyAmount(finalTax);
                setTaxYearlyAmount(taxDeduction);
                const salaryAfterTaxDeduction = salaryNum - roundedProvdntFnd - finalTax - eobi;
                setSalaryAfterDeduction(salaryAfterTaxDeduction);
            }
            else if (yearlySalary > 4100000) {
                const exceededAmount = yearlySalary - 4100000;
                const taxDeduction = (exceededAmount * 0.35) + 616000;
                const finalTax = taxDeduction / 12;
                setTaxMonthlyAmount(finalTax);
                setTaxYearlyAmount(taxDeduction);
                const salaryAfterTaxDeduction = salaryNum - roundedProvdntFnd - finalTax - eobi;
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
                    </div>
                    <div className="theme-toggle">
                        <span className="tc-sub">Theme</span>
                        <button onClick={() => {
                            const current = document.documentElement.getAttribute('data-theme') || 'light';
                            const next = current === 'light' ? 'dark' : 'light';
                            document.documentElement.setAttribute('data-theme', next);
                        }}>
                            <i className="pi pi-sun" style={{marginRight:6}}></i>Toggle
                        </button>
                    </div>
                </div>

                <div className="tc-grid">
                    <Row>
                        <Col xs={12} sm={12} md={6} lg={6} >
                            <div className="tc-field">
                                <label>Monthly Salary</label>
                                <InputText
                                    className="w-100"
                                    value={formatNumber(salary)}
                                    onChange={(e) => {
                                        const v = e.target.value;
                                        const parsed = parseNumber(v);
                                        setSalary(parsed);
                                        setSalaryMsg(false);
                                    }}
                                    disabled={providentFund && salary}
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
                                    value={formatNumber(providentFund)}
                                    onChange={(e) => {
                                        const v = e.target.value;
                                        const parsed = parseNumber(v);
                                        setProvidentFund(parsed);
                                    }}
                                    disabled={providentFund && salary}
                                    placeholder="Calculated or enter manually"
                                />
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4} >
                            <div className="tc-field">
                                <label>Monthly Tax Deduction</label>
                                <InputText
                                    className="w-100"
                                    value={formatNumber(taxMonthlyAmount)}
                                    disabled={providentFund && salary}
                                    placeholder="Auto-calculated"
                                />
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4} >
                            <div className="tc-field">
                                <label>Yearly Tax Deduction</label>
                                <InputText
                                    className="w-100"
                                    value={formatNumber(taxYearlyAmount)}
                                    disabled={providentFund && salary}
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
                                    value={formatNumber(salaryAfterDeduction)}
                                    disabled={providentFund && salary}
                                    placeholder="Auto-calculated"
                                />
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} className="d-flex justify-content-center">
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