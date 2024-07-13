import AddToCategory from "@/components/AddToCategory/AddToCategory";
import { Button } from "@/components/ui/button";
import categoryApi from "@/redux/features/category/categoryApi";
import SmallLoading from "../SharedPage/Loading/SmallLoading";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "react-toastify";
import UpdateCategoryModal from "@/components/AddToCategory/UpdateCategoryModal";
import Swal from "sweetalert2";


export type TCategory = {
  _id: string;
  name: string;
};
const CategoryManagement = () => {
  const {data:categorys, isLoading} = categoryApi.useGetAllCategoryQuery(undefined);
  const [deleteCategory]= categoryApi.useDeleteCategoryMutation();
 

    const handleDeleteCategory = async (id: string) => {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
          const res = await deleteCategory(id).unwrap();
          if (res.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Category has been deleted.",
              icon: "success",
            });
          }
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the product.",
          icon: "error",
        });
      }
    }


  return (
    <div>
      <div className="flex justify-between items-center my-3">
        <h2 className="text-center text-xl font-semibold">
          Category Management
        </h2>
        <div className="">
          <AddToCategory />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table border-1 ">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <>
                <SmallLoading />
              </>
            )}
            {categorys?.data?.map((category: TCategory, idx: number) => (
              <tr>
                <th>
                  <label>
                    <td>{idx + 1}</td>
                  </label>
                </th>
                <td>{category?.name}</td>
                <td>
                  <UpdateCategoryModal category={category} />
                  <Button
                    onClick={()=>handleDeleteCategory(category?._id)}
                    className="text-base text-slate-200 bg-gray-700 ml-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                      />
                    </svg>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryManagement;
