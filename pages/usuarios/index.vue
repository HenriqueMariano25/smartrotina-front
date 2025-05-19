<script setup lang="ts">
import type {IUsuario} from "~/interfaces/usuarios/usuario.interface";
import {buscarTodosUsuarios} from "~/composable/usuarios/buscarTodosUsuarios";
import {ICONES} from "~/constants/icones";
import {Icon} from "@iconify/vue";
import {ref} from "vue";
import {bloquearUsuario} from "~/composable/usuarios/bloquearUsuario";
import {useToast} from "primevue/usetoast";
import {desbloquearUsuario} from "~/composable/usuarios/desbloquearUsuario";
import {editarAdministradorUsuario} from "~/composable/usuarios/editarAdministradorUsuario";

const {$dayjs} = useNuxtApp()
const toast = useToast();

const usuarios = ref<IUsuario[] | []>([])
usuarios.value = await buscarTodosUsuarios()

const menuOpcoes = ref();
const opcoesItemTabela = ref<{ label: string; icon: string; command: () => void }[]>([])


const toggleMenuOpcoes = (event: Event, item: IUsuario) => {
  event.stopPropagation()
  menuOpcoes.value?.toggle(event);
  if (menuOpcoes.value.overlayVisible === true) {
    itemClicado.value = item
  }
};

const itemClicado = ref<IUsuario | null>(null)
const confirm = useConfirm();
const confimarBloquear = () => {
  confirm.require({
    message: `Tem certeza que deseja bloquear esse usuário ${itemClicado.value && itemClicado?.value.nome} ?`,
    header: 'Bloquear usuário',
    icon: 'pi pi-info-circle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Bloquear',
      severity: 'danger'
    },
    accept: () => {
      handleBloquearUsuario(itemClicado.value?.id as number)
    },
  });
};

async function handleBloquearUsuario(id: number) {
  const usuarioBloqueado = await bloquearUsuario(id)
  const index = usuarios.value?.findIndex(item => item.id === id)
  usuarios.value[index].bloqueadoEm = usuarioBloqueado.bloqueadoEm
  itemClicado.value = null
  toast.add({
    severity: 'success',
    summary: 'Sucesso ao bloquear',
    detail: 'Usuário bloqueado com sucesso',
    life: 4000
  });
}

const confimarDesbloquear = () => {
  confirm.require({
    message: `Tem certeza que deseja desbloquear esse usuário ${itemClicado.value && itemClicado?.value.nome} ?`,
    header: 'Desbloquear usuário',
    icon: 'pi pi-info-circle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Desbloquear',
      severity: 'success'
    },
    accept: () => {
      handleDesbloquearUsuario(itemClicado.value?.id as number)
    },
  });
};

async function handleDesbloquearUsuario(id: number) {
  await desbloquearUsuario(id)
  const index = usuarios.value?.findIndex(item => item.id === id)
  usuarios.value[index].bloqueadoEm = null
  itemClicado.value = null
  toast.add({
    severity: 'success',
    summary: 'Sucesso ao desbloquear',
    detail: 'Usuário desbloqueado com sucesso',
    life: 4000
  });
}

watch(itemClicado, async (valor) => {
  opcoesItemTabela.value = []

  if (valor?.bloqueadoEm) {
    opcoesItemTabela.value.push({
      label: 'Desbloquear',
      icon: "ic:round-block",
      command: () => {
        confimarDesbloquear()
      }
    })
  } else {
    opcoesItemTabela.value.push({
      label: 'Bloquear',
      icon: "ic:round-block",
      command: () => {
        confimarBloquear()
      }
    })
  }

  if (valor?.administrador) {
    opcoesItemTabela.value.push({
      label: 'Remover permissão de administrador',
      icon: "subway:admin-2",
      command: () => {
        confimarRemoverAdministrador()
      }
    })
  } else {
    opcoesItemTabela.value.push({
      label: 'Adicionar permissão de administrador',
      icon: "subway:admin-1",
      command: () => {
        confimarAdicionarAdministrador()
      }
    })
  }
})

const confimarAdicionarAdministrador = () => {
  confirm.require({
    message: `Tem certeza adicionar a permissão de administrador para esse usuário ${itemClicado.value && itemClicado?.value.nome} ?`,
    header: 'Adicionar permissão de administrador',
    icon: 'pi pi-info-circle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Adicionar',
      severity: 'danger'
    },
    accept: () => {
      handleAdicionarAdministrador(itemClicado.value?.id as number)
    },
  });
};

async function handleAdicionarAdministrador(id: number) {
  await editarAdministradorUsuario(id, true)
  const index = usuarios.value?.findIndex(item => item.id === id)
  usuarios.value[index].administrador = true
  itemClicado.value = null
  toast.add({
    severity: 'success',
    summary: 'Sucesso ao adicionar permissão',
    detail: 'Permissão adicionada com sucesso',
    life: 4000
  });
}

const confimarRemoverAdministrador = () => {
  confirm.require({
    message: `Tem certeza remover a permissão de administrador desse usuário ${itemClicado.value && itemClicado?.value.nome} ?`,
    header: 'Remover permissão de administrador',
    icon: 'pi pi-info-circle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Remover',
      severity: 'success'
    },
    accept: () => {
      handleRemoverAdministrador(itemClicado.value?.id as number)
    },
  });
};

async function handleRemoverAdministrador(id: number) {
  await editarAdministradorUsuario(id, false)
  const index = usuarios.value?.findIndex(item => item.id === id)
  usuarios.value[index].administrador = false
  itemClicado.value = null
  toast.add({
    severity: 'success',
    summary: 'Sucesso ao remover permissão',
    detail: 'Permissão removida com sucesso',
    life: 4000
  });
}

</script>

<template>
  <div class="flex flex-col w-full gap-4 h-full">
    <div class="flex justify-end p-2 bg-white rounded h-14"/>
    <div class="p-1 bg-white rounded">
      <DataTable :value="usuarios" table-style="min-width: 50rem" show-gridlines striped-rows size="small">
        <template #empty> Nenhum lista de compras adicionadas.</template>
        <Column header="" class="w-0">
          <template #body="{ data }">
            <Button text class="!p-1" @click="toggleMenuOpcoes($event, data )">
              <Icon :icon="ICONES.MAIS_OPCOES" style="color: #000000" width=""/>
            </Button>
          </template>
        </Column>
        <Column field="nome" header="Nome"/>
        <Column field="email" header="Email"/>
        <Column field="ultimoLogin" header="Último login">
          <template #body="{ data }">
            <span v-if="data.ultimoLogin">{{ $dayjs(data.ultimoLogin).format("DD/MM/YYYY HH:mm:ss") }}</span>
          </template>
        </Column>
        <Column field="administrador" header="Administrador">
          <template #body="{ data }">
            <span>{{ data.administrador === true ? 'SIM' : 'NÃO' }}</span>
          </template>
        </Column>
        <Column field="bloqueadoEm" header="Bloqueado em">
          <template #body="{ data }">
            <span v-if="data.bloqueadoEm">{{ $dayjs(data.bloqueadoEm).format("DD/MM/YYYY HH:mm:ss") }}</span>
          </template>
        </Column>
      </DataTable>
    </div>
    <div>
      <Menu id="overlay_tmenu" ref="menuOpcoes" :model="opcoesItemTabela" popup>
        <template #item="{ item, props }">
          <a v-ripple class="flex items-center" v-bind="props.action">
            <Icon v-if="item.icon" :icon="item?.icon" width="24"/>
            <span :class="item.icon"/>
            <span>{{ item.label }}</span>
          </a>
        </template>
      </Menu>
    </div>
    <ConfirmDialog>
      <template #icon>
        <Icon icon="ic:round-warning" width="32"/>
      </template>
    </ConfirmDialog>
    <Toast/>
  </div>

</template>

<style scoped>

</style>