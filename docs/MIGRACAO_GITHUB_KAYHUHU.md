# Migração completa: `anitacr` → `kayhuhu`

Este guia parte do Windows + PowerShell e preserva o histórico Git. O projeto local já é a cópia de trabalho mais atual; portanto, o caminho recomendado é publicar **esta pasta** na conta nova. A seção “Alternativa” explica como clonar o repositório antigo caso você esteja em outro computador.

## Antes de começar: entenda as quatro contas/configurações

Trocar de conta não é uma única ação:

1. **GitHub no navegador:** a conta aberta em `github.com`;
2. **GitHub CLI (`gh`):** a autorização usada para criar repositórios e fazer operações no terminal;
3. **Git:** nome/e-mail gravados como autor dos próximos commits;
4. **Vercel:** integração que observa um repositório e publica cada push.

Faça as quatro verificações. Estar logado como `kayhuhu` no navegador não garante que o terminal ou a Vercel também estejam.

## 1. Abra a pasta correta

1. Abra o **PowerShell** pelo menu Iniciar.
2. Copie o comando inteiro abaixo e pressione Enter:

```powershell
Set-Location "C:\Users\kapst\Documents\Codex\2026-08-03\desejo-criar-um-site-para-que"
```

3. Confirme o repositório e o último commit:

```powershell
git status
git remote -v
git log -1 --oneline
```

Não prossiga se o `git status` disser `not a git repository`.

## 2. Faça uma cópia de segurança do histórico

O comando abaixo cria um arquivo recuperável com todas as branches e tags, sem apagar nada:

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\Documents\git-backups"
git bundle create "$env:USERPROFILE\Documents\git-backups\data-science-quest-before-kayhuhu.bundle" --all
git bundle verify "$env:USERPROFILE\Documents\git-backups\data-science-quest-before-kayhuhu.bundle"
```

Resultado esperado: o último comando informa que o bundle está completo. Guarde esse arquivo até confirmar a nova publicação.

## 3. Remova a sessão antiga do GitHub CLI

Primeiro, veja a situação atual:

```powershell
gh auth status
```

Neste computador, a última auditoria encontrou `anitacr` como conta ativa, mas com token inválido. Remova essa credencial:

```powershell
gh auth logout -h github.com -u anitacr
```

Se aparecer uma confirmação, escolha **Yes**. Se o comando disser que a conta não existe, ela já foi removida e você pode continuar.

Confira:

```powershell
gh auth status
```

É normal o comando informar que não há login nesse momento.

## 4. Entre na conta `kayhuhu`

1. No navegador, abra `https://github.com`.
2. Clique na sua foto, depois em **Sign out** se ainda estiver na conta antiga.
3. Entre na conta cujo endereço é `https://github.com/kayhuhu`.
4. Volte ao PowerShell e execute:

```powershell
gh auth login -h github.com -p https -w --clipboard
```

5. O terminal exibirá um código temporário e abrirá o navegador. Se não abrir, use o endereço mostrado no terminal.
6. Cole o código, escolha **Authorize GitHub** e confirme que a página está logada como `kayhuhu` antes de autorizar.
7. Volte ao terminal e verifique:

```powershell
gh auth status
gh api user --jq .login
```

O último comando deve responder exatamente:

```text
kayhuhu
```

Se responder `anitacr`, pare: a conta errada foi autorizada. Repita as etapas 3 e 4.

## 5. Configure a autoria dos próximos commits

No GitHub, abra **Settings → Emails** e copie um e-mail verificado ou o endereço `noreply` mostrado pela plataforma. Depois execute, substituindo somente o texto entre aspas:

```powershell
git config --global user.name "kayhuhu"
git config --global user.email "COLE_AQUI_O_EMAIL_VERIFICADO_DA_KAYHUHU"
git config --global --get user.name
git config --global --get user.email
```

Isso altera os próximos commits; não reescreve a autoria do histórico antigo.

## 6. Preserve o remoto antigo

Em vez de apagar `origin`, renomeie-o para `old-origin`:

```powershell
git remote -v
git remote rename origin old-origin
git remote -v
```

Resultado esperado: os endereços antigos passam a aparecer como `old-origin`. Essa é uma referência de segurança e pode permanecer somente para leitura.

Se aparecer `No such remote: origin`, não há remoto antigo; pule para a próxima etapa.

## 7. Crie o repositório novo e publique todo o histórico

Confirme primeiro que você está na branch principal e que os testes passam:

```powershell
git branch --show-current
npm install
npm run check
```

Depois de commitar todas as mudanças locais, crie o novo repositório na conta `kayhuhu` e associe-o como `origin`:

```powershell
gh repo create kayhuhu/data-science-quest-roadmap --public --source . --remote origin --push
```

O comando cria o repositório, adiciona `origin` e envia a branch atual. Verifique:

```powershell
git remote -v
git branch -vv
gh repo view kayhuhu/data-science-quest-roadmap --web
```

O novo `origin` deve ser `https://github.com/kayhuhu/data-science-quest-roadmap.git`, e o navegador deve mostrar arquivos e histórico.

### Se o repositório `kayhuhu/data-science-quest-roadmap` já existir

Não execute `gh repo create`. Associe e envie:

```powershell
git remote add origin https://github.com/kayhuhu/data-science-quest-roadmap.git
git push -u origin main
```

Se a branch principal local tiver outro nome, confirme com `git branch --show-current` antes de substituir `main`.

## 8. Fluxo normal depois da migração

Para cada mudança futura:

```powershell
git status
git diff
git add .
git commit -m "feat: descreva a mudança"
git push
```

Nunca use `git add .` sem antes olhar `git status`. Não envie `.env`, tokens, bases bancárias, PII, `.venv`, livros ou PDFs protegidos.

## 9. Reconecte a Vercel ao repositório novo

O caminho visual recomendado mantém o projeto e o domínio atuais:

1. Entre em `https://vercel.com` com a identidade correta.
2. Abra o projeto **data-science-quest-roadmap**.
3. Entre em **Settings → Git**.
4. Em **Connected Git Repository**, clique em **Disconnect** para remover o repositório `anitacr`.
5. Clique para conectar um repositório e escolha `kayhuhu/data-science-quest-roadmap`.
6. Se ele não aparecer, abra as configurações da integração GitHub/Vercel e conceda acesso à conta `kayhuhu` e a esse repositório.
7. Confirme `main` como **Production Branch**.
8. Em **Settings → Environment Variables**, confira `NEXT_PUBLIC_APP_URL` se estiver configurada.
9. Faça um pequeno push ou use **Deployments → Redeploy**.
10. Abra `https://kayhuhu-roadmap.vercel.app` e confirme a versão.

Alternativa pela CLI, executada na raiz do projeto:

```powershell
npm install --global vercel
vercel login
vercel link
vercel git disconnect
vercel git connect
vercel --prod
```

Leia cada pergunta antes de confirmar: `vercel link` deve apontar para o projeto existente, e `vercel git connect` deve encontrar o novo `origin` de `kayhuhu`.

## 10. Alternativa: clonar o projeto antigo em outro computador

Use esta opção apenas se você não tiver a pasta local atualizada.

```powershell
Set-Location "$env:USERPROFILE\Documents"
git clone https://github.com/anitacr/data-science-quest-roadmap.git data-science-quest-roadmap
Set-Location data-science-quest-roadmap
git remote rename origin old-origin
gh auth status
gh repo create kayhuhu/data-science-quest-roadmap --public --source . --remote origin --push
```

Se o repositório antigo for privado, o clone só funcionará enquanto uma conta autorizada puder acessá-lo. Nesse caso, use a pasta local ou o arquivo `.bundle` da etapa 2.

## Checklist final

- [ ] `gh api user --jq .login` retorna `kayhuhu`.
- [ ] `git config --global --get user.name` retorna `kayhuhu`.
- [ ] `git remote -v` mostra `origin` em `kayhuhu` e, opcionalmente, `old-origin` em `anitacr`.
- [ ] `git push` termina sem erro.
- [ ] O repositório `kayhuhu/data-science-quest-roadmap` contém o histórico.
- [ ] A Vercel está conectada ao novo repositório e à branch `main`.
- [ ] Um push novo dispara deployment automático.
- [ ] O domínio de produção abre a versão mais recente.

## Referências oficiais

- GitHub CLI: `gh auth login`, `gh auth logout`, `gh auth status` e `gh repo create`.
- Vercel: **Project Settings → Git** ou `vercel git disconnect/connect`.
