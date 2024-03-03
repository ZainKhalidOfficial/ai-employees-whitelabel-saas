
import { SearchInput } from "@/components/search-input";

import { Categories } from "@/components/categories";
import prisma from "@/lib/prisma";
import { Experts } from "@/components/experts";

import { getUserToken } from "@/app/helpers/getUserToken";


interface GPTCHAT {
    role: "user" | "system"; 
    content: string;
  }
  
interface ExpertsPageProps {
    searchParams: {
        categoryId: string;
        name: string;
    }
}

const ExpertsPage =async ({
    searchParams
}: ExpertsPageProps) => {

    const userToken = getUserToken();

    const data = await prisma.companion.findMany({
        where:  {
            categoryId: searchParams.categoryId,
            name: {
                search: searchParams.name
            },
            OR: [
                {userId: userToken?.user.id},
                {userId: 'admin'}
            ]
            
            
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            _count: {
                select: {
                    messages: true
                }
            }
        }
    })

    const categories = await prisma.category.findMany(); 

  

    // const [categories, setCategories] = useState<Category[]>([]);
    // const [isLoading, setIsLoading] = useState(true); // Add a loading state
  
    // useEffect(() => {
    //   async function fetchData() {
    //     try {
    //       const categoriesData = await categoriesList();
    //       setCategories(categoriesData);
    //       setIsLoading(false); // Set isLoading to false when data is fetched
    //     } catch (error) {
    //       console.error("Error fetching categories:", error);
    //     }
    //   }
    //   fetchData();
    // }, []);

    // const proModal = useProModal();

    // const router = useRouter();
    // const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])

    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         prompt: ""
    //     }
    // });

    // const isLoading = form.formState.isSubmitting;

    // const onSubmit = async (values : z.infer<typeof formSchema>) => {
        
    //     try {
       
    //         const userMessage: ChatCompletionRequestMessage = {
    //             role: "user",
    //             content: values.prompt,
    //         };

    //         const newMessages = [...messages, userMessage];

    //         const responce = await axios.post("/api/conversation", {
    //             messages: newMessages,
    //         });

    //         setMessages((current) => [...current, userMessage, responce.data]);

    //         form.reset();
    //     }
    //     catch (error: any) {
    //         console.log(error);
    //         if(error?.response?.status === 403) {
    //             proModal.onOpen();
    //         } else {
    //             toast.error("Something went wrong");
    //         }

            
    //     }
    //     finally {
    //         router.refresh();
    //     }

    // }

    return ( 
            <div className="h-full p-4 space-y-2">
                <SearchInput />
                <Categories data={categories} />
                <Experts data={data} />
            </div>
     );
}
 
export default ExpertsPage;

