import LogInView from '@/views/LogInView.vue';
import LoginForm from '@/components/LoginForm.vue';
import {getUserData} from "../../src/services/user.ts";
import { mount, flushPromises } from "@vue/test-utils";

jest.mock('../../src/services/user.ts');
beforeEach(() => {
    
    jest.clearAllMocks();
    window.localStorage.clear();
})

const localStorageMock = (function () {
    let store :any = {};
  
    return {
      getItem(key:any) :any {
        return store[key];
      },
  
      setItem(key:any, value:any|null) {
        store[key] = value;
      },
  
      clear() {
        store = {};
      },
  
      removeItem(key:any) {
        delete store[key];
      },
  
      getAll() :any{
        return store;
      },
    };
  })();
  
  Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe('LogInView', () => {
    test('should first', async () => { 
        const wrapper = mount(LogInView);
        await (wrapper.vm as any).swichView();
        expect((wrapper as any).html()).toContain('<h2>SIGN UP</h2>');
     })
     test('should second', async () => { 
        const wrapper = mount(LogInView);
        await (wrapper as any).findComponent(LoginForm).vm.$emit('swichView');
        expect((wrapper as any).html()).toContain('<h2>SIGN UP</h2>');
     })

    it('Calls getMessage once and displays message', async () => {
        (getUserData as any).mockResolvedValueOnce('John Doe');
        const wrapper = mount(LogInView);

        const mockToken = "token";
        const mockTokenData ='12345';
    
        window.localStorage.setItem(mockToken, mockTokenData);
        window.localStorage.removeItem("token");
        // expect(localStorage.getItem(mockId)).toEqual(mockOldData);
    
        await flushPromises()
        expect(getUserData).toHaveBeenCalledTimes(1);
        const user = (wrapper.vm as any).user;
        expect(user).toEqual('John Doe');

        // const token = "token";
        // const mockJson = null;
        // await (wrapper.vm as any).setLocalStorage(token, mockJson);
        //expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
      })
     
});
