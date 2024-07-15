# Organon - Sistema De Organização de Conteúdos para as Escolas 
### Curso Desenvolvimento de Sistemas - SENAI

Este projeto foi desenvolvido por alunos da instituição SESI SENAI para a SA(Situação de Aprendizagem), no progrma de aprendizagem industrial, disciplina Desenvolvimento de Sistemas. A proposta deste trabalho se trata de uma aplicação web que inclua um CRUD completo utilizando SQL.

![login (2)](https://github.com/user-attachments/assets/15980835-ec93-4748-a9f8-3c54506084c7)

## :closed_book: Sobre o Projeto
Com o intuito de ser um sistema para facilitar a organização dos estudos nas escolas, o projeto Organon apresenta recursos para professores e estudantes interagirm de forma a disponibilizar conteúdos e atividades, de forma organizada, com links de rápido acesso.

## :clipboard: Pré-requisitos
  Para a implementação do sistema, você deve possuir esses recursos instalados na sua máquina

  *  git, bash ou desktop
  *  Python, versão 3.11 ou maior
  *  Pip
  *  Node Js
  *  Npm

  ### Dependências do Projeto:

  Backend: [Requirements.txt](backend/requirements.txt)

  Frontend: [Package.json](frontend/package.json)

## :hammer: Desenvolvido com 

<table>
    <tr>
        <td>FrontEnd</td>
        <td>Backend</td>
    </tr>
    <tr>
        <td>React</td>
        <td>Django Rest Framework</td>
    </tr>
    <tr>
        <td>Typescript</td>
        <td>Python</td>
    </tr>
    <tr>
        <td>Axios</td>
        <td>Cloudinary</td></td>
    </tr>
</table>

## Tutorial de Utilização
O sistema possui três níveis de usuário, sendo eles estudante, professor e escola. Dito isto, algumas funcionalidades só podem ser acessadas por níveis de usuários específicos.

### Funcionalidades globais
*  Login - O login pode ser efetuado por qualquer nível de usuário, basta inserir o email e a senha para entrar no sistema.

*  Início - A página de ínicio se trata de um overview de conteúdos e notícias, é a partir desta página que os usuários podem acessar os conteúdos, disponibilizados pela escola e pelos professores, através de um menu das matérias, dos cards de novos conteúdos e de uma barra de pesquisa.

*  Matéria - Na página da matéria, além dos usuários poderem acessar os conteúdos disponíveis, eles poderão marca-los como concluído.

*  Conteúdo - Nesta página, os usuários podem acessar o vídeo e o conteúdo em PDF disponibilizado pelo professor, além disso, há um sistema de comentários que todo usuário pode adicionar ao conteúdo.

*  Perfil - Para gerenciar suas informações pessoais, o sistema contempla toda uma sessão de perfil, que contempla a porcentagem de progresso em relação aos conteúdos de cada matéria, edição de nome e, no caso dos professores, edição dos campos de histórico estudantil e profissional.

* Segurança da Conta - Esta página permite que o usuário altere dados sensíveis.

* Desativar Conta - Está página permite que o usuário desative a sua conta permanentemente.
  
* Anotações - Aqui o usuário pode criar anotações em cima dos conteúdos abordados no sistema, podendo enditá-los e deletá-los também.

### Estudante
* Cadastro - Caso o usuário seja um estudante, deverá realizar o cadastro do aluno e confirmar um código de identificação enviado por email.

### Professor
* Conteúdo e Adicionar Conteúdo - Todo professor pode acessar uma tela de conteúdos, a qual pode acessar todos so seus conteúdos já disponibilizados, podendo removê-los e editá-los. Também há uma opção de criar novo conteúdo, que é um formulário completo.

### Escola
* Toda usuário "Escola" possuirá acesso há uma página própria para o cadastro de novos professores, sendo um formulário que incluí informações sobre o histórico profissional e estudantil.

## :shipit: Autores
Daniel Lima - 
Cauan de Souza Moreira - 
Pedro Henrique Vittoreti - 
