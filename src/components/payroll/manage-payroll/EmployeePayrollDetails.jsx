import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAllPayrollByEmployeeId } from '../../../service/payrollService';

export default function EmployeeDetails() {
  const { employeeId } = useParams();
  const [payrollDetails, setPayrollDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployeePayroll() {
      setLoading(true);
      const payrollResponse = await fetchAllPayrollByEmployeeId(employeeId);
      setPayrollDetails(payrollResponse.success ? payrollResponse.data : []);
      setLoading(false);
    }
    fetchEmployeePayroll();
  }, [employeeId]);

  const payrollMetrics = useMemo(() => {
    const totalPayout = payrollDetails.reduce((sum, p) => sum + p.finalSalary, 0);
    const totalDeductions = payrollDetails.reduce((sum, p) => sum + p.deduction, 0);
    const averageSalary = payrollDetails.length ? totalPayout / payrollDetails.length : 0;
    return { totalPayout, totalDeductions, averageSalary };
  }, [payrollDetails]);

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100">
      <h2 className="text-3xl font-bold mb-6">Employee Details: <span className="text-blue-500">{employeeId}</span></h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 dark:bg-blue-800 p-4 rounded-xl shadow">
          <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Payout</h4>
          <p className="text-2xl font-bold">₹ {payrollMetrics.totalPayout.toFixed(2)}</p>
        </div>
        <div className="bg-red-50 dark:bg-red-800 p-4 rounded-xl shadow">
          <h4 className="text-sm font-semibold text-red-700 dark:text-red-300">Total Deductions</h4>
          <p className="text-2xl font-bold">₹ {payrollMetrics.totalDeductions.toFixed(2)}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-800 p-4 rounded-xl shadow">
          <h4 className="text-sm font-semibold text-green-700 dark:text-green-300">Average Salary</h4>
          <p className="text-2xl font-bold">₹ {payrollMetrics.averageSalary.toFixed(2)}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Payroll History</h3>
      {payrollDetails.length > 0 ? (
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2">Month</th>
              <th className="px-4 py-2">Year</th>
              <th className="px-4 py-2">Gross Amount</th>
              <th className="px-4 py-2">Deductions</th>
              <th className="px-4 py-2">Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {payrollDetails.map((payroll, idx) => (
              <tr key={idx} className="border-b dark:border-gray-600">
                <td className="px-4 py-2">{new Date(0, payroll.month - 1).toLocaleString('default', { month: 'long' })}</td>
                <td className="px-4 py-2">{payroll.year}</td>
                <td className="px-4 py-2">₹ {payroll.amount}</td>
                <td className="px-4 py-2">₹ {payroll.deduction}</td>
                <td className="px-4 py-2 font-semibold">₹ {payroll.finalSalary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">No payroll details available.</p>
      )}
    </div>
  );
}