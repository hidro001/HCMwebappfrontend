import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../service/axiosInstance";

export default function EmployeeIndividualRatings() {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRatings() {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/ratings/employee/${employeeId}/all-ratings`);
        if (res.data.success) {
          setEmployee(res.data.data.employee);
          setRatings(res.data.data.ratings);
        }
      } catch (err) {
        console.error("Failed to fetch ratings", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRatings();
  }, [employeeId]);

  if (loading) return <div>Loading ratings...</div>;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Ratings for {employee?.first_Name} {employee?.last_Name} ({employee?.employee_Id})
      </h1>

      {ratings.length === 0 ? (
        <p>No ratings found for this employee.</p>
      ) : (
        <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2">Frequency</th>
              <th className="px-4 py-2">Date/Period</th>
              <th className="px-4 py-2">Total Score</th>
              <th className="px-4 py-2">Comment</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((r) => (
              <tr key={r._id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 capitalize">{r.frequency}</td>
                <td className="px-4 py-2">
                  {r.frequency === "daily" ? new Date(r.date).toLocaleDateString() :
                   r.frequency === "weekly" ? `Week ${r.week}, ${r.year}` :
                   r.frequency === "monthly" ? `${r.month}/${r.year}` :
                   r.year}
                </td>
                <td className="px-4 py-2 font-semibold">{r.totalScore.toFixed(2)}</td>
                <td className="px-4 py-2">{r.comment || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
