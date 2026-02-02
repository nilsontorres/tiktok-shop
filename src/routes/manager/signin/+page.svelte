<script>
    import { enhance } from "$app/forms";

    import EmailField from "$component/manager/signin/EmailField.svelte";
    import PasswordField from "$component/manager/signin/PasswordField.svelte";

    const submitForm = async ({ formData, cancel }) => {
        const email = formData.get("email");
        const password = formData.get("password");

        cancel();

        return ({ update }) => {}
    }
</script>

<div class="flex justify-center items-center w-full h-dvh bg-[#f7f7f7]">
    <div class="flex flex-col w-[420px] px-[46px] pt-[46px] pb-[50px] gap-[20px] bg-white shadow rounded-[10px]">
        <div class="flex flex-col gap-[5px]">
            <h4 class="w-full text-black text-[22px] font-semibold leading-none">Login</h4>
            <span class="text-[#666] text-[15px]">Faça login com sua conta.</span>
        </div>
        <form method="post" class="flex flex-col gap-[12px]" use:enhance={submitForm}>
            <div class="flex flex-col gap-[12px]">
                <EmailField/>
                <PasswordField/>
            </div>
            <button class="bg-black w-full hover:opacity-90 cursor-pointer h-[46px] rounded-full" type="submit">
                <span class="text-white text-[15px] font-semibold">Entrar agora</span>
            </button>
        </form>
    </div>
</div>