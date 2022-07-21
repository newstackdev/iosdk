import { UserStake } from "../../../../Components/UserWidget";

export const StakeModal = ({ daoOwner, visible }: { daoOwner: string; visible?: boolean }) => {
  return (
    <div style={{ color: "white" }}>
      <UserStake user={{ username: daoOwner }} hideButton={!visible} />
    </div>
  );
};
