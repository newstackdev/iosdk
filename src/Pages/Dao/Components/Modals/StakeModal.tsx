import { UserStake } from "../../../../Components/UserWidget";

export const StakeModal = ({ daoOwner, visible }: { daoOwner: string; visible?: boolean }) => {
  return (
    <div>
      <UserStake user={{ username: daoOwner }} hideButton={!visible} />
    </div>
  );
};
