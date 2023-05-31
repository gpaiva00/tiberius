import { ListProps, ListTypesProps } from '@/typings/List'
import { IconWeight } from '@phosphor-icons/react'
import { ToastPosition } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

// ROUTES
export const LIST_ROUTE = '/list'
export const SIGN_IN_ROUTE = '/sign-in'
export const USER_ROUTE = '/user'
export const LISTS_ROUTE = '/lists'
export const LIST_SETTINGS_ROUTE = '/list-settings'
export const CHANGE_LOG_ROUTE = '/change-log'
export const TERMOS_OF_USE_ROUTE = '/terms-of-use'
export const CONTACT_ROUTE = '/contact'
export const ABOUT_ROUTE = '/about'
export const HELP_ROUTE = '/help'
export const OVERVIEW_ROUTE = '/overview'

export const GENERAL_LIST: Omit<ListProps, 'userId' | 'createdAt'> = {
  id: uuidv4(),
  items: [],
  name: 'geral',
  position: 0,
  type: ListTypesProps.GENERAL,
}

export const WHATS_NEW_LIST: Omit<ListProps, 'userId'> = {
  id: uuidv4(),
  items: [],
  name: 'novidades',
  position: 1,
  type: ListTypesProps.WHATS_NEW,
  createdAt: new Date().toISOString(),
}

export const URL_REGEX = /(https?:\/\/[^\s]+)/g

// STORAGE
export const STORAGE_USER_KEY = '@tiberius/user'
export const STORAGE_SELECTED_LIST_ID_KEY = '@tiberius/selectedList'
export const HAVE_SEEN_CHANGE_LOG_DATE_KEY = '@tiberius/haveSeenChangeLogDate'

export const DEFAULT_ICON_SIZE = 20

// STYLES
export const DEFAULT_ICON_PROPS = {
  size: DEFAULT_ICON_SIZE,
  weight: 'bold' as IconWeight,
}

export const DEFAULT_TOAST_PROPS = {
  position: 'top-center' as ToastPosition,
  style: {
    width: '900px',
    fontSize: '0.875rem',
  },
}

// RANDOM MESSAGES
export const QUOTES = [
  '"A jornada de mil passos começa com um único item concluído."',
  '"Cada tarefa concluída é um passo em direção ao sucesso."',
  '"Grandes realizações começam com pequenas tarefas."',
  '"A produtividade é a chave para desbloquear seu potencial."',
  '"Acredite no poder de suas listas para alcançar seus objetivos."',
  '"O sucesso está na ação, não na inação."',
  '"Transforme suas tarefas em conquistas notáveis."',
  '"Faça cada momento contar em direção à realização."',
  '"O caminho para o sucesso é pavimentado com tarefas bem feitas."',
  '"Você está um passo mais perto de seus sonhos com cada item concluído."',
]

export const ERROR_MESSAGES = [
  'Parece que perdemos a conexão com o universo digital. Vamos tentar encontrar o caminho de volta juntos.',
  'Ops, parece que algo deu uma voltinha pelo nosso código! Estamos trabalhando para trazê-lo de volta ao caminho certo.',
  'Parece que o universo digital está em manutenção. Vamos esperar um pouco para ver se ele volta.',
  'Opa! Algo saiu do script e agora estamos dançando ao som de um bug. A equipe está trabalhando duro para desligar a música e consertar isso.',
  'Parece que as linhas do nosso código estão tendo uma pequena confusão.',
  'Oops! Parece que nossos hamsters programadores entraram em greve. Vamos trocar as rodinhas deles e resolver isso rapidinho!',
  'Ops-a-daisy! Nosso time de robôs comediantes tentou fazer uma piada e acabou bugando tudo. Estamos corrigindo o palco para a próxima apresentação!',
  'Eita lasquera! Nosso sistema encontrou um problema e saiu correndo atrás de um café. Vamos acelerar a xícara e logo estaremos no ritmo novamente!',
  'Uau, pegamos você de surpresa! Nosso sistema decidiu tirar um cochilo inesperado, mas estamos preparando um alarme bem barulhento para acordá-lo!',
  'Ups-a-daisy! Parece que nosso programador trapalhão derrubou uma pilha de códigos. Vamos pegar a vassoura e voltar a funcionar!',
]

export const ITEM_COMPLETED_MESSAGES = [
  'Adivinha quem é o mestre das tarefas? Sim, você mesmo! Continue brilhando!',
  'Concluindo tarefas como um ninja! Próximo desafio: conquistar o mundo!',
  'Você é uma máquina de produtividade! Dê uma pausa para recarregar seu modo incrível.',
  'Com tanta eficiência, você está prestes a receber um diploma em conclusão de tarefas!',
  'Você é uma estrela cadente da produtividade. Brilhe ainda mais na próxima tarefa!',
  'Parabéns! Seu superpoder de conclusão de tarefas está em pleno funcionamento!',
  'Você é uma verdadeira máquina de produtividade! Continue fazendo coisas incríveis!',
  'Você está dominando a arte de realizar tarefas. O próximo item da lista não tem ideia do que está por vir!',
  'Está uma festa da produtividade por aqui, e você é o DJ! Toque a próxima música!',
  'Você está voando alto na escala de produtividade! Prepare-se para pousar suavemente na próxima tarefa.',
  'Você está deixando as tarefas com inveja da sua eficiência. Continue brilhando!',
  'Concluiu mais uma tarefa? Sua capa de super-herói está ficando cada vez mais estilosa!',
  'Você é a prova viva de que produtividade e diversão podem caminhar juntas. Continue se divertindo nas próximas tarefas!',
  'Impressionante! Você está arrasando mais do que um show de fogos de artifício no dia da independência!',
  'Se fossemos um jardim, você seria o botânico-chefe da produtividade. Cultive mais tarefas incríveis!',
  'Você é um verdadeiro mestre Jedi da realização de tarefas. A Força está com você!',
  'Uau, seu nível de produtividade é tão alto que até os pássaros estão aplaudindo lá fora!',
  'Estamos sem palavras! Você está transformando tarefas em obras-primas. Continue pintando o mundo com sua produtividade!',
  'Você está deixando o Sol com inveja do seu brilho de produtividade! Continue irradiando sucesso!',
  'Se as tarefas fossem troféus, você seria um campeão olímpico! Continue subindo no pódio da produtividade!',
  'Aplausos de pé! Sua produtividade está arrancando sorrisos e muitos emojis de parabéns!',
  'Seu nível de conclusão de tarefas é tão épico que merece uma trilha sonora. Aperte o play e continue sendo incrível!',
  'Você está dominando a arte de riscar tarefas da lista como um mestre da espada. A próxima batalha aguarda!',
  'Nada segura você! Sua produtividade é como um trem de alta velocidade - continue acelerando nas próximas tarefas!',
  'Você é uma máquina de produtividade tão eficiente que até os relógios estão ficando com inveja da sua pontualidade!',
  'Você é um verdadeiro embaixador da produtividade! Estamos pensando em erguer uma estátua em sua honra.',
  'Bravo! Sua produtividade está fazendo com que o universo aplauda de pé. Continue brilhando nas próximas tarefas!',
  'Uau, suas tarefas estão se rendendo ao seu talento produtivo! Continue conquistando uma após a outra!',
  'Parabéns, mestre das tarefas! Você está conquistando mais território do que um explorador em uma expedição épica!',
  'Você é uma verdadeira estrela da produtividade, iluminando o caminho para o sucesso. Continue brilhando!',
  'A cada tarefa concluída, um sorriso surge no rosto do universo. Continue espalhando alegria com sua produtividade!',
  'Uau, você está arrasando tanto nas tarefas que as metas estão pedindo autógrafos! Continue sendo um exemplo de sucesso.',
  'Você é um verdadeiro herói da produtividade! Sua superpotência: concluir tarefas em tempo recorde!',
  'Concluiu mais uma tarefa? É como marcar um gol no último minuto da partida! Continue driblando desafios!',
  'Se a produtividade fosse uma competição, você seria o medalhista de ouro! Mantenha-se no topo do pódio!',
  'Seu nível de produtividade está tão alto que as nuvens estão te aplaudindo. Continue elevando sua performance!',
  'Você está quebrando recordes de produtividade como um velocista no campo das tarefas. Continue correndo rumo ao sucesso!',
  'Você é um verdadeiro astro das tarefas, brilhando mais do que um céu estrelado. Continue sua jornada estelar!',
]

export const LIST_COMPLETED_MESSAGES = [
  'Parabéns! Você arrasou e concluiu sua lista inteira! A sensação de conquista é incrível, não é?',
  'Uau! Você fez isso! Tarefa por tarefa, você chegou ao final da lista. Sinta-se orgulhoso(a) do seu trabalho!',
  'Bravo! Você é uma máquina de produtividade! Completar a lista toda é uma vitória e você conseguiu!',
  'Fantástico! Você atingiu o objetivo! Agora, celebre essa conquista e descanse um pouco. Você merece!',
  'Incrível! Você finalizou todas as tarefas da lista. Isso é um sinal claro de que você é um(a) verdadeiro(a) campeão/campeã da produtividade!',
  'É uma maratona de tarefas e você venceu! Parabéns por cruzar a linha de chegada e concluir tudo. Você é demais!',
  'Woo-hoo! A lista está completa! Seu esforço e dedicação valeram a pena. Agora, aproveite a sensação de realização.',
  'Que desempenho incrível! Você concluiu todas as tarefas da lista. Continue assim e não há limites para o que você pode conquistar!',
  'Uau, que conquista impressionante! Você é uma verdadeira força da natureza quando se trata de produtividade. Continue brilhando!',
  'Parabéns! Você conquistou o status de "Mestre da Lista". Nada pode detê-lo(a) quando você está no modo de produtividade total!',
]

export const CONGRATS_EMOJIS = [
  '🎉',
  '🎊',
  '👏',
  '👍',
  '🙌',
  '🤩',
  '🥳',
  '🤗',
  '🤟',
  '👌',
  '👊',
  '🤙',
  '👑',
  '🏆',
  '🥇',
  '🎯',
  '✨',
  '🌟',
  '🌈',
  '🔥',
  '🚀',
  '🎇',
]
