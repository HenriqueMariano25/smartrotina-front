<script setup lang="ts">
import {Icon} from '@iconify/vue';
import {ref} from 'vue'
import { DataView} from "primevue";

const stepAtiva = ref(2)
const moradores = ref([
  {id: 1, nome: "Henrique Mariano"},
  {id: 2, nome: "Maria Eduarda"},
])

const produtos = ref([
  {produtoId: 1, nome: 'Açúcar', quantidade: 1, unidade: 'kg'},
  {produtoId: 2, nome: 'Arroz', quantidade: 3, unidade: 'un'},
])

defineProps({
  visible: Boolean,
})
defineEmits(['update:visible'])
</script>

<template>
  <Dialog class="w-5/12 bg-gray-200 " :visible="visible" modal header="Cadastrar lista de compra" @update:visible="$emit('update:visible')" >
    <Stepper v-model:value="stepAtiva" linear>
      <StepList>
        <Step :value="1">Lista</Step>
        <Step :value="2">Produtos</Step>
      </StepList>
      <StepPanels class="!p-0">
        <StepPanel v-slot="{ activateCallback }" :value="1">
          <div class="flex flex-col gap-4">
            <FloatLabel variant="on">
              <InputText id="nomeLista" class="w-full"/>
              <label for="nomeLista">Nome da lista</label>
            </FloatLabel>
            <FloatLabel variant="on">
              <Select :options="moradores" filter optionLabel="nome"
                      class="w-full"/>
              <label for="on_label">Responsável</label>
            </FloatLabel>
            <div class="flex justify-end">
              <Button @click="activateCallback(2)">
                <div>
                  <Icon icon="lucide:move-right" width="32"/>
                </div>
                <span>Próxima</span>
              </Button>
            </div>
          </div>

        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" :value="2">
          <div class="flex flex-col gap-4 w-full">
            <div class="flex gap-4 w-full justify-between">
              <FloatLabel variant="on">
                <InputText id="nomeLista" class="!w-full"/>
                <label for="nomeLista">Buscar produto</label>
              </FloatLabel>
              <Button type="button" class="font-bold">
                <div>
                  <Icon icon="ic:round-plus" width="24"/>
                </div>
                <span>Produto</span>
              </Button>
            </div>
            <div>
              <span class="font-bold text-gray-600" v-if="produtos.length === 0">Sem produtos adicionados!</span>
              <div class="border rounded p-1 border-gray-300">
                <DataView :value="produtos">
                  <template #list="slotProps">
                    <div class="flex flex-col">
                      <div v-for="(item, index) in slotProps.items" :key="index">
                        <div class="flex justify-between items-end" :class="{'border-t border-gray-300': index !== 0}">
                          <div class="flex flex-col p-2">
                            <span class="font-bold">{{ item.nome }}</span>
                            <span>Quantidade: {{ item.quantidade }} {{ item.unidade }}</span>
                          </div>
                          <div>
                            <Button variant="link" v-tooltip="{ value: 'Editar produto', showDelay: 800 }">
                              <div class="!text-gray-900">
                                <Icon icon="ic:round-edit" width="24"/>
                              </div>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </DataView>
              </div>
            </div>
            <div class="flex !justify-between" style="justify-content: space-between">
              <Button variant="outlined" @click="activateCallback(1)">
                <div>
                  <Icon icon="lucide:move-left" width="32"/>
                </div>
                <span>Voltar</span>
              </Button>
              <Button @click="activateCallback(2)">
                <div>
                  <Icon icon="ic:round-save" width="32"/>
                </div>
                <span>Salvar</span>
              </Button>
            </div>
          </div>

        </StepPanel>
      </StepPanels>
    </Stepper>
  </Dialog>
</template>

<style scoped>

</style>