import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";

function Members({ searchTerm }) {
  const [members, setMembers] = useState([]);
  const { userStatus, selectUser } = useContext(ChatContextv2);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/chat/member`
        );
        setMembers(response.data.data);
      } catch (error) {
        console.error("Error in getting members:", error);
      }
    };

    fetchMembers();
  }, []);

  const filteredMembers = members.filter((member) => {
    const fullName = `${member.first_Name} ${member.last_Name}`.toLowerCase();
    const employeeId = member.employee_Id?.toString().toLowerCase();
    const search = searchTerm.toLowerCase();

    return fullName.includes(search) || employeeId.includes(search);
  });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Add Members</h2>
      <ul>
        {filteredMembers.map((member, index) => {
          const isOnline = userStatus[member.employee_Id];

          return (
            <div
              className="member flex items-center gap-4 m-5 cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-100 p-2 rounded"
              key={index}
              onClick={() =>
                selectUser({
                  ...member,
                  employeeId: member.employee_Id,
                  firstName: member.first_Name,
                  lastName: member.last_Name,
                  userAvatar: member.user_Avatar,
                })
              }
            >
              <div className="relative w-12 h-12">
                <img
                  src={member.user_Avatar}
                  alt={`${member.first_Name} ${member.last_Name}`}
                  className="rounded-full border w-12 h-12 object-cover"
                />
                {isOnline && (
                  <span
                    className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                    title="Online"
                  ></span>
                )}
              </div>
              <div>
                <h3 className="font-medium">
                  {member.first_Name} {member.last_Name}
                </h3>
                <p className="text-gray-400 text-sm">{member.employee_Id}</p>
              </div>
            </div>
          );
        })}
        {filteredMembers.length === 0 && (
          <div className="text-center text-gray-400 p-4">No members found</div>
        )}
      </ul>
    </div>
  );
}

export default Members;
