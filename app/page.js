
import Alltask from "@/components/Alltask";
import AllTaskMobile from "@/components/AllTaskMobile";

export default function Home() {

  return (
    <>
      <div className="sm:hidden">
      <Alltask/>
      </div>
      <div className="md:hidden lg:hidden xl:hidden">
        <AllTaskMobile />
      </div>
    </>
  );
}
