import { shallowMount } from "@vue/test-utils";

import FabVue from "@/modules/daybook/components/FabVue";

describe("Prueba en el FAB component", () => {
  test("debe de mostrar el icono por defecto", () => {
    const wrapper = shallowMount(FabVue);

    expect(wrapper.find("i").classes()).toContain("fa-plus");

    //fa-plus
  });
  test("debe de mostrar el icono por argumento: fa-save", () => {
    const wrapper = shallowMount(FabVue, {
      props: {
        icon: "fa-save",
      },
    });

    expect(wrapper.find("i").classes()).toContain("fa-save");
    //fa-save
  });
  test("debe de mostrar el evento on:click cuando se hace click", () => {
    const wrapper = shallowMount(FabVue);

    wrapper.find("button").trigger("click");
    expect(wrapper.emitted("on:click")).toHaveLength(1);
  });
});
